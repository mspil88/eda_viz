from flask import Flask, request, session, make_response, render_template
import pandas as pd
import os

app = Flask(__name__)


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

@app.route("/user/<id>")
def get_user(id):
    return f"<h1> Hi user: {id}"

@app.route("/overview")
def overview():
    #temp load
    data = pd.read_csv(os.path.join('/mnt/c/Users/matth/workspace/eda_viz/src/eda/data', "train.csv"))

    return render_template("overview.html")

