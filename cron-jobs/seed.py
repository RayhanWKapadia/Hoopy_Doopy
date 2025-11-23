from datetime import date
from nba_api.stats.endpoints import leaguedashplayerstats
import pandas as pd
import json
import sys
import os
from pymongo import MongoClient

# MongoDB stores data as documents (JSON-like) in collections (analogous to tables but schema-flexible). 
# The Python driver (pymongo) converts your Python dicts into BSON (binary JSON) and sends them over a TCP connection.
# To view the data do the following:

# docker exec -it mongo mongosh
# show dbs
# use mongoDB
# show collections
# db.player_basic_stats.find().limit(3).pretty()

def current_season(today: date | None = None) -> str:
	"""Return current NBA season string like '2025-26'.
	NBA season rolls over in August (preseason prep) / October (regular season start).
	Using August threshold to anticipate upcoming season once month >= 8.
	"""
	if today is None:
		today = date.today()
	start_year = today.year if today.month >= 8 else today.year - 1
	end_year = str(start_year + 1)[-2:]
	return f"{start_year}-{end_year}"

def fetch_basic_player_stats(season: str) -> pd.DataFrame:
	"""Fetch all player base stats for a given season regular season using LeagueDashPlayerStats."""
	endpoint = leaguedashplayerstats.LeagueDashPlayerStats(
		season=season,
		season_type_all_star="Regular Season",
		measure_type_detailed_defense="Base",  # ensures basic box score stats
		per_mode_detailed="PerGame",  # could switch to Total if needed
	)
	df = endpoint.get_data_frames()[0]
	basic_cols = [
		"PLAYER_ID",
		"PLAYER_NAME",
		"TEAM_ID",
		"TEAM_ABBREVIATION",
		"AGE",
		"GP",
		"W",
		"L",
		"MIN",
		"PTS",
		"REB",
		"AST",
		"STL",
		"BLK",
		"TOV",
		"FG_PCT",
		"FG3_PCT",
		"FT_PCT",
	]
	existing = [c for c in basic_cols if c in df.columns]
	return df[existing]

def persist(df: pd.DataFrame, season: str) -> None:
	csv_path = f"player_basic_stats_{season}.csv"
	json_path = f"player_basic_stats_{season}.json"
	df.to_csv(csv_path, index=False)
	with open(json_path, "w") as f:
		json.dump(df.to_dict(orient="records"), f)
	print(f"Saved {len(df)} player rows to {csv_path} and {json_path}")
	
def load_to_mongo(df: pd.DataFrame, season: str) -> None:
    uri = os.getenv("MONGO_URI", "mongodb://mongo:27017")
    db_name = os.getenv("MONGO_DB", "mongoDB")
    coll_name = os.getenv("MONGO_COLLECTION", "player_basic_stats")
    try:
        client = MongoClient(uri)
        db = client[db_name]
        coll = db[coll_name]
        records = df.to_dict(orient="records")
        for r in records:
            r["SEASON"] = season
        if records:
            coll.insert_many(records)
        print(f"Inserted {len(records)} docs into {db_name}.{coll_name}")
    except Exception as e:
        print(f"Mongo insert failed: {e}", file=sys.stderr)
    finally:
        try:
            client.close()
        except:
            pass

def main():
    season = current_season()
    print(f"Fetching NBA player basic stats for season {season}...")
    try:
        df = fetch_basic_player_stats(season)
    except Exception as e:
        print(f"Error fetching stats: {e}", file=sys.stderr)
        sys.exit(1)
    print(df)
    persist(df, season)
    load_to_mongo(df, season)

if __name__ == "__main__":
	main()
