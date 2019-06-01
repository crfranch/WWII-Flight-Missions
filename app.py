# Import Dependencies

import pandas as pd

import csv
import json
# from cStringIO import StringIO
from flask import Flask, render_template, request, jsonify

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask_sqlalchemy import SQLAlchemy

# Flask Setup
app = Flask(__name__)

# The database URI
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wwii_flights"

db = SQLAlchemy(app)

# Create our database model
# class Missions(db.Model):
#     __tablename__ = 'Flights'

#     id = db.Column(db.Integer, primary_key=True)
#     LONGITUDE = db.Column(db.String)
#     LATITUDE = db.Column(db.String)
#     MSNDATE = db.Column(db.String)
#     YEAR = db.Column(db.Integer)
#     AIRCRAFT_NAME = db.Column(db.String)


#Reflect an existing database into a new model
Base = automap_base()

#Reflect the tables
Base.prepare(db.engine, reflect=True)

# Save reference to the table
Missions = Base.classes.wwii_flights

# Route Home Page
@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")

@app.route("/Columns")
def WWII_Flight_Columns():
    """Return WWII flight Columns"""

    # Using Pandas
    stmt = db.session.query(Missions).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return jsonify(list(df.columns))

@app.route("/Data")
def WWII_Flight_Missions():
    """Return WWII flight data"""

    # Query for the WWII Country Flying Mission
    # sel = [
    #     Missions.LONGITUDE,
    #     Missions.LATITUDE,
    #     Missions.MSNDATE,
    #     Missions.YEAR,
    #     Missions.AIRCRAFT_NAME,
    #     Missions.COUNTRY_FLYING_MISSION,
    #     Missions.TGT_COUNTRY
    # ]
    # results = db.session.query(*sel).all()

    results = db.session.query(Missions.LONGITUDE, Missions.LATITUDE, Missions.MSNDATE, Missions.AIRCRAFT_NAME, Missions.COUNTRY_FLYING_MISSION).\
        order_by(Missions.MSNDATE.asc())
    # print(results)


    master_list = []
    for result in results:
        Mission_Data = {}
        Mission_Data["LONGITUDE"] = result
        Mission_Data["LATITUDE"] = result
        Mission_Data["MSNDATE"] = result
        # Mission_Data["YEAR"] = result
        Mission_Data["AIRCRAFT NAME"] = result
        Mission_Data["COUNTRY_FLYING_MISSION"] = result
        # Mission_Data["TGT_COUNTRY"] = result
        master_list.append(Mission_Data)

    # print(Mission_Data)
    return jsonify(master_list)



    # Format the data for Plotly/take help on this
    # trace = {
    #     "x": df["AIRCRAFT NAME"].values.tolist(),
    #     "y": df["YEAR"].values.tolist(),
    #     "type": "bar"
    # }
    # return jsonify(list.df.values)

if __name__ == '__main__':
    app.run(debug=True)


