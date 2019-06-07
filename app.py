# Import Dependencies

import pandas as pd
import csv
import json
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

    results = db.session.query(Missions.MISSION_ID,
                                Missions.LONGITUDE, 
                                Missions.LATITUDE, 
                                Missions.MSNDATE, 
                                Missions.YEAR, 
                                Missions.AIRCRAFT_NAME,
                                Missions.TGT_COUNTRY,
                                Missions.COUNTRY_FLYING_MISSION).order_by(Missions.MSNDATE.asc())
    # print(results)


    master_list = []
    for result in results:
        Mission_Data = {}
        Mission_Data["MISSION_ID"] = result.MISSION_ID
        Mission_Data["LONGITUDE"] = result.LONGITUDE
        Mission_Data["LATITUDE"] = result.LATITUDE
        Mission_Data["MSNDATE"] = result.MSNDATE
        Mission_Data["YEAR:"] = result.YEAR
        Mission_Data["AIRCRAFT_NAME"] = result.AIRCRAFT_NAME
        # Mission_Data["AIRCRAFT TYPE"] = result.AIRCRAFT_TYPE
        Mission_Data["COUNTRY_FLYING_MISSION"] = result.COUNTRY_FLYING_MISSION
        Mission_Data["TGT_COUNTRY"] = result.TGT_COUNTRY
        master_list.append(Mission_Data)

    # print(Mission_Data)
    return jsonify(master_list)


if __name__ == '__main__':
    app.run(debug=True)
