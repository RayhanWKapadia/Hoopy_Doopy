import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { fetchPlayers, selectPlayers, selectPlayersLoading, selectPlayersError } from '../stores/playerData';
import type { AppDispatch } from '../stores/playerStore';

function PlayerTable() {
  const dispatch = useDispatch<AppDispatch>();
  const players = useSelector(selectPlayers);
  const loading = useSelector(selectPlayersLoading);
  const error = useSelector(selectPlayersError);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  if (loading) return <div>Loading players...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Player Name</th>
          <th>Team</th>
          <th>Age</th>
          <th>GP</th>
          <th>PTS</th>
          <th>REB</th>
          <th>AST</th>
          <th>FG%</th>
        </tr>
      </thead>
      <tbody>
        {players.length === 0 ? (
          <tr>
            <td colSpan={8}>No players found</td>
          </tr>
        ) : (
          players.map((player) => (
            <tr key={player._id || player.playerId}>
              <td>{player.playerName}</td>
              <td>{player.teamAbbreviation}</td>
              <td>{player.age}</td>
              <td>{player.gp}</td>
              <td>{player.pts}</td>
              <td>{player.reb}</td>
              <td>{player.ast}</td>
              <td>{player.fgPct ? `${(player.fgPct * 100).toFixed(1)}%` : '-'}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default PlayerTable;