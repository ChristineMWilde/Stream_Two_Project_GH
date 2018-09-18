import os
from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

#MONGODB_HOST = 'localhost'
#MONGODB_PORT = 27017
#DBS_NAME = 'fishingUK'
#COLLECTION_NAME = 'projects'
#need to update fishing_quotas.py with the mongo URI

MONGO_URI = os.getenv('mongodb://<dbuser>:<dbpassword>@ds149134.mlab.com:49134/heroku_6c7ft11f', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('heroku_6c7ft11f', 'fishingUK')
COLLECTION_NAME = 'projects'




@app.route("/")
def index():
    
    return render_template("index.html")


@app.route("/fishingUK/projects")
def fishing_project():
   
    FIELDS = {
        '_id': False,
        'fish_name': True, 'date': True, 'fish_type': True,
        'quantity': True, 'value': True,
        'region': True, 'main_port': True
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    # The MONGO_URI connection is required when hosted using a remote mongo db.
    with MongoClient(MONGO_URI) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        projects = collection.find(projection=FIELDS, limit=20000)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(projects))


if __name__ == "__main__":
    app.run(debug=True)