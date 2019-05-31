# Import Dependencies
import csv
import json
from cStringIO import StringIO
from flask import Flask, render_template, request, make_response

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# Set up the database
engine = create_engine("sqlite:///wwii_flights.sqlite")

# Reflect an existing database into a new model
Base = automap_base()

# Reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Mission = Base.classes.wwii_flights

# Create session from Python to the DB
session = Session(engine)

# Flask Setup
app = Flask(__name__)

#Flask Routes
@app.route('/', methods=['GET', 'POST'])
def predict() :
    # Query specific info about each mission
    results = session.query(Mission.MSNDATE, Mission.LATITUDE, Mission.LONGITUDE, Mission.COUNTRY_FLYING_MISSION, Mission.TGT_COUNTRY, Mission.AIRCRAFT_NAME, Mission.YEAR, ).all()
    
    # Create a dictionary from the row data and append to a list of all_passengers
    all_missions = []
    for MSNDATE, LATITUDE, LONGITUDE, COUNTRY_FLYING_MISSION, TGT_COUNTRY, AIRCRAFT_NAME, YEAR in results:
        mission_dict = {}
        mission_dict[]= PRIMARY_KEY
        mission_dict["Date of Mission:"] = MSNDATE
        mission_dict["Year:"] = YEAR
        mission_dict["Lat:"] = LATITUDE
        mission_dict["Long:"] = LONGITUDE
        mission_dict["Country of Origin:"] = COUNTRY_FLYING_MISSION
        mission_dict["Target Country:"] = TGT_COUNTRY
        mission_dict["Aircraft Type:"] = AIRCRAFT_NAME
        all_missions.append(mission_dict)

if __name__ == '__main__' :
     regr = joblib.load('model.pkl')
     app.run(port=8080, debug=True)

    # json_ = request.json
    # new = pd.read_csv('WWII_flight_missions.csv')
    # json_vector = new.transform(json_)
    # query = pd.DataFrame(json_vector)
    # flight = regr.flights(query)
    # return json.dumps({'flight': list({{flight}})})


# Now configure the database connection. 
# Sqlite will be used and WWII_flight_missions.db will be used 
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///WWII_flight_missions.db'
# db = SQLAlchemy(app)

