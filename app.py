from flask import Flask, request, session, make_response, render_template
from flask_jsglue import JSGlue
import pandas as pd
import os


app = Flask(__name__)

jsglue = JSGlue()
jsglue.init_app(app)

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

    test_overview = {'overview': [{'rows': 891}, {'variables': 12}, {'missing': {'count': 866, 'proportion': 0.08099513655069211}}, {'missing_plot': {'x': ['Cabin', 'Age', 'Embarked', 'PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'SibSp', 'Parch', 'Ticket', 'Fare'], 'y': [687, 177, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]}}, {'duplicates': {'num_duplicates': 0, 'proportion_duplicated': 0.0}}, {'example': {'head': {'PassengerId': {0: 1, 1: 2, 2: 3, 3: 4, 4: 5}, 'Survived': {0: 0, 1: 1, 2: 1, 3: 1, 4: 0}, 'Pclass': {0: 3, 1: 1, 2: 3, 3: 1, 4: 3}, 'Name': {0: 'Braund, Mr. Owen Harris', 1: 'Cumings, Mrs. John Bradley (Florence Briggs Thayer)', 2: 'Heikkinen, Miss. Laina', 3: 'Futrelle, Mrs. Jacques Heath (Lily May Peel)', 4: 'Allen, Mr. William Henry'}, 'Sex': {0: 'male', 1: 'female', 2: 'female', 3: 'female', 4: 'male'}, 'Age': {0: 22.0, 1: 38.0, 2: 26.0, 3: 35.0, 4: 35.0}, 'SibSp': {0: 1, 1: 1, 2: 0, 3: 1, 4: 0}, 'Parch': {0: 0, 1: 0, 2: 0, 3: 0, 4: 0}, 'Ticket': {0: 'A/5 21171', 1: 'PC 17599', 2: 'STON/O2. 3101282', 3: '113803', 4: '373450'}, 'Fare': {0: 7.25, 1: 71.2833, 2: 7.925, 3: 53.1, 4: 8.05}, 'Cabin': {0: 'nan', 1: 'C85', 2: 'nan', 3: 'C123', 4: 'nan'}, 'Embarked': {0: 'S', 1: 'C', 2: 'S', 3: 'S', 4: 'S'}}, 'tail': {'PassengerId': {886: 887, 887: 888, 888: 889, 889: 890, 890: 891}, 'Survived': {886: 0, 887: 1, 888: 0, 889: 1, 890: 0}, 'Pclass': {886: 2, 887: 1, 888: 3, 889: 1, 890: 3}, 'Name': {886: 'Montvila, Rev. Juozas', 887: 'Graham, Miss. Margaret Edith', 888: 'Johnston, Miss. Catherine Helen "Carrie"', 889: 'Behr, Mr. Karl Howell', 890: 'Dooley, Mr. Patrick'}, 'Sex': {886: 'male', 887: 'female', 888: 'female', 889: 'male', 890: 'male'}, 'Age': {886: 27.0, 887: 19.0, 888: 'nan', 889: 26.0, 890: 32.0}, 'SibSp': {886: 0, 887: 0, 888: 1, 889: 0, 890: 0}, 'Parch': {886: 0, 887: 0, 888: 2, 889: 0, 890: 0}, 'Ticket': {886: '211536', 887: '112053', 888: 'W./C. 6607', 889: '111369', 890: '370376'}, 'Fare': {886: 13.0, 887: 30.0, 888: 23.45, 889: 30.0, 890: 7.75}, 'Cabin': {886: 'nan', 887: 'B42', 888: 'nan', 889: 'C148', 890: 'nan'}, 'Embarked': {886: 'S', 887: 'S', 888: 'S', 889: 'C', 890: 'Q'}}}}, {'data_types': {'PassengerId': {'original_dtype': 'int64', 'mapped_dtype': 'numeric'}, 'Survived': {'original_dtype': 'int64', 'mapped_dtype': 'categorical'}, 'Pclass': {'original_dtype': 'int64', 'mapped_dtype': 'categorical'}, 'Name': {'original_dtype': 'object', 'mapped_dtype': 'categorical'}, 'Sex': {'original_dtype': 'object', 'mapped_dtype': 'categorical'}, 'Age': {'original_dtype': 'float64', 'mapped_dtype': 'numeric'}, 'SibSp': {'original_dtype': 'int64', 'mapped_dtype': 'categorical'}, 'Parch': {'original_dtype': 'int64', 'mapped_dtype': 'categorical'}, 'Ticket': {'original_dtype': 'object', 'mapped_dtype': 'categorical'}, 'Fare': {'original_dtype': 'float64', 'mapped_dtype': 'numeric'}, 'Cabin': {'original_dtype': 'object', 'mapped_dtype': 'categorical'}, 'Embarked': {'original_dtype': 'object', 'mapped_dtype': 'categorical'}}}, {'mapped_type_count': {'numeric': 3, 'categorical': 9}}]}
    over = {'overview': [{'rows': 891},
  {'variables': 12},
  {'missing': {'count': 866, 'proportion': 0.08099513655069211}},
  {'missing_plot': {'x': ['Cabin',
     'Age',
     'Embarked',
     'PassengerId',
     'Survived',
     'Pclass',
     'Name',
     'Sex',
     'SibSp',
     'Parch',
     'Ticket',
     'Fare'],
    'y': [687, 177, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]}},
  {'duplicates': {'count': 0, 'proportion': 0.0}},
  {'head': {'PassengerId': {0: 1, 1: 2, 2: 3, 3: 4, 4: 5},
    'Survived': {0: 0, 1: 1, 2: 1, 3: 1, 4: 0},
    'Pclass': {0: 3, 1: 1, 2: 3, 3: 1, 4: 3},
    'Name': {0: 'Braund, Mr. Owen Harris',
     1: 'Cumings, Mrs. John Bradley (Florence Briggs Thayer)',
     2: 'Heikkinen, Miss. Laina',
     3: 'Futrelle, Mrs. Jacques Heath (Lily May Peel)',
     4: 'Allen, Mr. William Henry'},
    'Sex': {0: 'male', 1: 'female', 2: 'female', 3: 'female', 4: 'male'},
    'Age': {0: 22.0, 1: 38.0, 2: 26.0, 3: 35.0, 4: 35.0},
    'SibSp': {0: 1, 1: 1, 2: 0, 3: 1, 4: 0},
    'Parch': {0: 0, 1: 0, 2: 0, 3: 0, 4: 0},
    'Ticket': {0: 'A/5 21171',
     1: 'PC 17599',
     2: 'STON/O2. 3101282',
     3: '113803',
     4: '373450'},
    'Fare': {0: 7.25, 1: 71.2833, 2: 7.925, 3: 53.1, 4: 8.05},
    'Cabin': {0: 'nan', 1: 'C85', 2: 'nan', 3: 'C123', 4: 'nan'},
    'Embarked': {0: 'S', 1: 'C', 2: 'S', 3: 'S', 4: 'S'}}},
  {'tail': {'PassengerId': {886: 887, 887: 888, 888: 889, 889: 890, 890: 891},
    'Survived': {886: 0, 887: 1, 888: 0, 889: 1, 890: 0},
    'Pclass': {886: 2, 887: 1, 888: 3, 889: 1, 890: 3},
    'Name': {886: 'Montvila, Rev. Juozas',
     887: 'Graham, Miss. Margaret Edith',
     888: 'Johnston, Miss. Catherine Helen Carrie',
     889: 'Behr, Mr. Karl Howell',
     890: 'Dooley, Mr. Patrick'},
    'Sex': {886: 'male',
     887: 'female',
     888: 'female',
     889: 'male',
     890: 'male'},
    'Age': {886: 27.0, 887: 19.0, 888: 'nan', 889: 26.0, 890: 32.0},
    'SibSp': {886: 0, 887: 0, 888: 1, 889: 0, 890: 0},
    'Parch': {886: 0, 887: 0, 888: 2, 889: 0, 890: 0},
    'Ticket': {886: '211536',
     887: '112053',
     888: 'W./C. 6607',
     889: '111369',
     890: '370376'},
    'Fare': {886: 13.0, 887: 30.0, 888: 23.45, 889: 30.0, 890: 7.75},
    'Cabin': {886: 'nan', 887: 'B42', 888: 'nan', 889: 'C148', 890: 'nan'},
    'Embarked': {886: 'S', 887: 'S', 888: 'S', 889: 'C', 890: 'Q'}}},
  {'data_types': {'PassengerId': {'original_dtype': 'int64',
     'mapped_dtype': 'numeric'},
    'Survived': {'original_dtype': 'int64', 'mapped_dtype': 'categorical'},
    'Pclass': {'original_dtype': 'int64', 'mapped_dtype': 'categorical'},
    'Name': {'original_dtype': 'object', 'mapped_dtype': 'categorical'},
    'Sex': {'original_dtype': 'object', 'mapped_dtype': 'categorical'},
    'Age': {'original_dtype': 'float64', 'mapped_dtype': 'numeric'},
    'SibSp': {'original_dtype': 'int64', 'mapped_dtype': 'categorical'},
    'Parch': {'original_dtype': 'int64', 'mapped_dtype': 'categorical'},
    'Ticket': {'original_dtype': 'object', 'mapped_dtype': 'categorical'},
    'Fare': {'original_dtype': 'float64', 'mapped_dtype': 'numeric'},
    'Cabin': {'original_dtype': 'object', 'mapped_dtype': 'categorical'},
    'Embarked': {'original_dtype': 'object', 'mapped_dtype': 'categorical'}}},
  {'mapped_type_count': {'numeric': 3, 'categorical': 9}}]}
    return render_template("overview.html", overview=over)

@app.route("/variables")
def variables():
    print("accessing variable route")
    return render_template("variables.html")