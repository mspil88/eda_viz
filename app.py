import os
import json
from operator import itemgetter
from flask import Flask, request, session, make_response, render_template
from flask_jsglue import JSGlue
from flask_caching import Cache
import pandas as pd
from src.preprocess import PreprocessDataFrame
from src.report_builder import build_report
from route_utils.variable_route_res import get_variable_select_options, get_dtype_map
from route_utils.relationship_route_helpers import get_scatterplot_keys, get_box_numeric_and_cat


app = Flask(__name__)
app.config["CACHE_TYPE"] = "SimpleCache"
jsglue = JSGlue()
jsglue.init_app(app)
cache = Cache(app)

@app.route("/")
def index():
    user = request
    sess = session
    print(sess)
    print(app.url_map)
    print(user)
    res = make_response('<h1> hi there </h1>')
    res.set_data('''{stuff: 5}''')
    res.status_code = 200
    return res


@app.route("/load", methods=["GET", "POST"])
def load():
    if request.method == "GET":
        return render_template("load.html")
    else:
        print("load posting")
        response_json = request.get_json()
        data, file_extension, delimiter, exclude_columns, cat_columns = itemgetter("data", "fileExtension",
                                                                                   "delim", "dataExclusions",
                                                                                   "categoricals")(response_json)
        df = PreprocessDataFrame(data, file_extension, delimiter, exclude_columns).process_data()
        report = build_report(df)
        cache.set("data", report)
        return render_template("load.html")

@app.route("/relationships")
def relationships():
    obj = cache.get("data")[0]
    correlation = obj["overview"][9]["correlation"]
    scatterplot = obj["overview"][10]
    boxplot = obj["overview"][11]["boxplot_data"]


    keys = get_scatterplot_keys(scatterplot)
    numeric_variables, categorical_variables = get_box_numeric_and_cat(boxplot)

    return render_template("relationships.html", obj=correlation, scatter=scatterplot, _keys=keys, box=boxplot,
                           box_r1=numeric_variables, box_r2=categorical_variables)

@app.route("/overview")
def overview():
    over = {"overview": cache.get("data")[0]["overview"][:9]}
    return render_template("overview.html", overview=over)


@app.route("/variables")
def variables():

    var_obj = cache.get("data")[1:]
    keys = get_variable_select_options(var_obj)
    _map = get_dtype_map(var_obj)

    return render_template("variables.html", keys=keys, obj=var_obj, _map=_map)