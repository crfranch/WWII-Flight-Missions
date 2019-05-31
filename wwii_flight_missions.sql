CREATE DATABASE wwii_flight_missions_db;
USE wwii_flight_missions_db;

CREATE TABLE missions (
 id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
 WWII_ID INT,
 MASTER_INDEX_NUMBER FLOAT,
 MSNDATE DATE,
 THEATER TEXT,
 NAF TEXT,
 COUNTRY_FLYING_MISSION TEXT,
 TGT_COUNTRY_CODE FLOAT,
 TGT_COUNTRY TEXT,
 TGT_LOCATION TEXT,
 TGT_TYPE TEXT,
 TGT_ID FLOAT,
 TGT_INDUSTRY_CODE FLOAT,
 TGT_INDUSTRY TEXT,
 SOURCE_LATITUDE TEXT,
 SOURCE_LONGITUDE TEXT,
 LATITUDE FLOAT,
 LONGITUDE FLOAT,
 UNIT_ID TEXT,
 MDS TEXT,
 AIRCRAFT_NAME TEXT,
 MSN_TYPE FLOAT,
 TGT_PRIORITY TEXT,
 TGT_PRIORITY_EXPLANATION TEXT,
 AC_ATTACKING FLOAT,
 ALTITUDE FLOAT,
 ALTITUDE_FEET FLOAT,
 NUMBER_OF_HE FLOAT,
 NUMBER_OF_IC FLOAT,
 TYPE_OF_IC FLOAT,
 LBS_IC FLOAT,
 TONS_OF_IC FLOAT,
 NUMBER_OF_FRAG FLOAT,
 TYPE_OF_FRAG TEXT,
 LBS_FRAG FLOAT,
 TONS_OF_FRAG FLOAT,
 TOTAL_LBS FLOAT,
 TOTAL_TONS FLOAT,
 TAKEOFF_BASE TEXT,
 TAKEOFF_COUNTRY TEXT,
 TAKEOFF_LATITUDE FLOAT,
 TAKEOFF_LONGITUDE FLOAT,
 BDA TEXT,
 CALLSIGN TEXT,
 ROUNDS_AMMO FLOAT,
 YEAR TEXT
);