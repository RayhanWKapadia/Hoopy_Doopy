# NBA Player Stats Cron Jobs

![Python](https://img.shields.io/badge/Python-3.11+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

Fetch and store basic per–game NBA player statistics for the current season into MongoDB. Produces CSV + JSON artifacts and optional Mongo inserts.

## Features
- Auto-detect current NBA season (August rollover)
- Pull base stats via `nba_api`
- Persist to CSV + JSON
- Bulk insert into MongoDB
- Environment–configurable connection

## Quick Start
```bash
pip install -r requirements.txt
export MONGO_URI="mongodb://mongo:27017"
export MONGO_DB="mongoDB"
export MONGO_COLLECTION="player_basic_stats"
python seed.py
```

## Output Files
- player_basic_stats_YYYY-YY.csv
- player_basic_stats_YYYY-YY.json

## MongoDB (Docker)
```bash
docker exec -it mongo mongosh
show dbs
use mongoDB
show collections
db.player_basic_stats.find().limit(3).pretty()
```

## Sample Document
```json
{
  "_id": "ObjectId(...)",
  "PLAYER_ID": 203076,
  "PLAYER_NAME": "Giannis Antetokounmpo",
  "TEAM_ABBREVIATION": "MIL",
  "PTS": 27.2,
  "REB": 11.1,
  "AST": 5.9,
  "SEASON": "2025-26"
}
```

## Index Recommendation
```javascript
db.player_basic_stats.createIndex({ PLAYER_ID: 1, SEASON: 1 })
```

## Environment Variables
| Name | Default | Purpose |
|------|---------|---------|
| MONGO_URI | mongodb://mongo:27017 | Connection string |
| MONGO_DB | mongoDB | Database name |
| MONGO_COLLECTION | player_basic_stats | Collection name |

## Troubleshooting
| Issue | Fix |
|-------|-----|
| Empty data | Confirm season string | 
| Connection refused | Use service name `mongo` in Docker |
| Slow queries | Add index above |

## Next Ideas
- Add CLI flags (`--season`, `--per=Total`)
- Add logging to file
- Add tests for season rollover

## License
MIT