from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'fishingUK'
COLLECTION_NAME = 'project2'


@app.route("/")
def index():
    
    return render_template("index.html")


@app.route("/fishingUK/project2")
def fishing_project():
   
    FIELDS = {
        '_id': False,
        'fish_name': True, 'date': True, 'fish_type': True,
        'quantity': True, 'value': True,
        'region': True, 'main_port': True
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        project2 = collection.find(projection=FIELDS, limit=55000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(project2))


if __name__ == "__main__":
    app.run(debug=True)
