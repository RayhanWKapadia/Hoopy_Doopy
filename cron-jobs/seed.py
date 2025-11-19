from nba_api.stats.endpoints import playercareerstats

# https://github.com/swar/nba_api 
# This is the source for the APU

career = playercareerstats.PlayerCareerStats(player_id='203999')

career.season_totals_regular_season.get_data_frame()
print(career.season_averages_regular_season.get_data_frame())
