# Import Dependencies

import pandas as pd

import csv
import json
from cStringIO import StringIO
from flask import Flask, render_template, request, jsonify

import numpy as np

from flask_sqlalchemy import SQLAlchemy

# Flask Setup
app = Flask(__name__)

# The database URI
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wwii_flights.sqlite"

db = SQLAlchemy(app)

# Create database model
class wwii_flights(db.Model):
    __tablename__ = 'wwii_flights'

    unique_id = wwii_flights.Column(wwii_flights.Integer, primary_key=True)
    MSNDATE = wwii_flights.Column(wwii_flights.String)
    YEAR = wwii_flights.Column(wwii_flights.String)
    COUNTRY_FLYING_MISSION = wwii_flights.Column(wwii_flights.String)
    TGT_COUNTRY= wwii_flights.Column(wwii_flights.String)
    LATITUDE = wwii_flights.Column(wwii_flights.Float)
    LONGITUDE = wwii_flights.Column(wwii_flights.Float)
    AIRCRAFT_NAME = wwii_flights.Column(wwii_flights.String)

    def __repr__(self):
        return '<Missions %r>' % (self.name)

# Flask Routes
# Create database tables
# Register a function to be run before the first request to this instance of the application.
@app.before_first_request
def setup():
    wwii_flights.create_all()

@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")


@app.route("WWII_Country_Flying_Missions")
def WWII_Country_Flying_Missions():
    """Return WWII flight data"""

    # Query for the WWII Country Flying Mission Dates
    results = wwii_flights.session.query(wwii_flights.LONGITUDE, wwii_flights.LATITUDE, wwii_flights.MSNDATE, wwii_flights.AIRCRAFT_NAME, wwii_flights.COUNTRY_FLYING_MISSION).\
        order_by(wwii_flights.MSNDATE.asc()).\

    # Format the data for Plotly/take help on this
    trace = {
        "x": df["Longitude"].values.tolist(),
        "y": df["Latitude"].values.tolist(),
        "type": "decide on a type with group"
    }
    return jsonify(trace)

@app.route("WWII_Target_Countries")
def WWII_Target_Countries():
    # Query for the WWII Target Country
    results = wwii_flights.session.query(wwii_flights.LONGITUDE, wwii_flights.LATITUDE, wwii_flights.MSNDATE, wwii_flights.AIRCRAFT_NAME, wwii_flights.TGT_COUNTRY).\
        order_by(wwii_fligts.MSNDATE.asc()).\

    # Format the data for Plotly/take help on this
    trace = {
        "x": df["Longitude"].values.tolist(),
        "y": df["Latitude"].values.tolist(),
        "type": "decide on a type with group"
    }
    return jsonify(trace)

@app.route("WWII_Aircraft_Type")
def WWII_Aircraft_Type():
    # Query for the Aircraft Type
    results = wwii_flights.session.query(wwii_flights.LONGITUDE, wwii_flights.LATITUDE, wwii_flights.MSNDATE, wwii_flights.AIRCRAFT_NAME).\
        order_by(wwii_flights.AIRCRAFT_NAME()).\

    # Format the data for Plotly/take help on this
    trace = {
        "x": df["Longitude"].values.tolist(),
        "y": df["Latitude"].values.tolist(),
        "type": "decide on a type with group"
    }
    return jsonify(trace)

if __name__ == '__main__':
    app.run(debug=True)
      
# # Set up the database
# engine = create_engine("sqlite:///wwii_flights.sqlite")

# #Reflect an existing database into a new model
# Base = automap_base()

# #Reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# Mission = Base.classes.wwii_flights

# # Create session from Python to the DB
# session = Session(engine)

# #Flask Routes
# @app.route('/', methods=['GET', 'POST'])
# def predict() :
#     # Query specific info about each mission
#     results = session.query(Mission.MSNDATE, Mission.LATITUDE, Mission.LONGITUDE, Mission.COUNTRY_FLYING_MISSION, Mission.TGT_COUNTRY, Mission.AIRCRAFT_NAME, Mission.YEAR, ).all()
    
#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_missions = []
#     for MSNDATE, LATITUDE, LONGITUDE, COUNTRY_FLYING_MISSION, TGT_COUNTRY, AIRCRAFT_NAME, YEAR in results:
#         mission_dict = {}
#         mission_dict[]= PRIMARY_KEY
#         mission_dict["Date of Mission:"] = MSNDATE
#         mission_dict["Year:"] = YEAR
#         mission_dict["Lat:"] = LATITUDE
#         mission_dict["Long:"] = LONGITUDE
#         mission_dict["Country of Origin:"] = COUNTRY_FLYING_MISSION
#         mission_dict["Target Country:"] = TGT_COUNTRY
#         mission_dict["Aircraft Type:"] = AIRCRAFT_NAME
#         all_missions.append(mission_dict)

# if __name__ == '__main__' :
#      regr = joblib.load('model.pkl')
#      app.run(port=8080, debug=True)

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

