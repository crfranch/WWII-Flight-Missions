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

#Reflect an existing database into a new model
Base = automap_base()

#Reflect the tables
Base.prepare(db.engine, reflect=True)

# Save reference to the table
Mission = Base.classes.wwii_flights

# Route Home Page
@app.route("/")
def home():
    """Render Home Page."""
    return render_template("index.html")

@app.route("/WWII_Country_Flying_Missions")
def WWII_Flight_Cloumns():
    """Return WWII flight Columns"""

    #Using Pandas
    stmt = db.session.query(Mission).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    return jsonify(list(df.columns))

@app.route("/WWII_Country_Flying_Dates")
def WWII_Flight_Dates():
    """Return WWII flight dates"""

    # Query for the WWII Country Flying Mission Dates
    results = wwii_flights.session.query(wwii_flights.LONGITUDE, 
                                         wwii_flights.LATITUDE, 
                                         wwii_flights.MSNDATE, 
                                         wwii_flights.AIRCRAFT_NAME, 
                                         wwii_flights.COUNTRY_FLYING_MISSION).order_by(wwii_flights.MSNDATE.asc())

    # Format the data for Plotly/take help on this
    # trace = {
    #     "x": df["Longitude"].values.tolist(),
    #     "y": df["Latitude"].values.tolist(),
    #     "type": "decide on a type with group"
    # }
    return jsonify(list.df.


if __name__ == '__main__':
    app.run(debug=True)


