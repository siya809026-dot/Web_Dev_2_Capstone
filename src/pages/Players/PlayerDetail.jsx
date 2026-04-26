import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../../store/playersSlice";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  Tooltip
} from "recharts";
import { getRoleColor } from "../../utils/helpers";
import styles from "./PlayerDetail.module.css";

function PlayerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const player = useSelector((s) => s.players.all.find((p) => p.id === Number(id)));

  if (!player) {
    return (
      <div className={styles.notFound}>
        <p>Player not found</p>
        <Link to="/players">← Back to Players</Link>
      </div>
    );
  }

  const radarData = [
    { stat: "Batting", value: Math.min(100, (player.runs / 80)) },
    { stat: "Bowling", value: player.wickets > 0 ? Math.min(100, player.wickets / 2) : 5 },
    { stat: "Strike Rate", value: Math.min(100, player.strikeRate / 2) },
    { stat: "Average", value: Math.min(100, player.average * 2) },
    { stat: "Experience", value: Math.min(100, player.matches / 2.5) },
    { stat: "Rating", value: player.rating },
  ];

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Back</button>

      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.avatar}>{player.image}</span>
          <div>
            <h1 className={styles.name}>{player.name}</h1>
            <p className={styles.teamName}>{player.team} • {player.country}</p>
            <div
              className={styles.roleBadge}
              style={{ background: getRoleColor(player.role) + "22", color: getRoleColor(player.role) }}
            >
              {player.role}
            </div>
          </div>
        </div>
        <div className={styles.heroRight}>
          <button
            className={`${styles.favBtn} ${player.isFav ? styles.active : ""}`}
            onClick={() => dispatch(toggleFavourite(player.id))}
          >
            {player.isFav ? "⭐ In Favourites" : "☆ Add to Favourites"}
          </button>
          <div className={styles.rating}>
            <span className={styles.ratingNum}>{player.rating}</span>
            <span className={styles.ratingLbl}>Overall Rating</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {/* Batting Stats */}
        <div className={styles.statsBox}>
          <h2 className={styles.boxTitle}>Batting Stats</h2>
          <div className={styles.statsGrid}>
            {[
              { label: "Matches", value: player.matches },
              { label: "Total Runs", value: player.runs.toLocaleString() },
              { label: "Average", value: player.average },
              { label: "Strike Rate", value: player.strikeRate },
              { label: "Fifties", value: player.fifties },
              { label: "Hundreds", value: player.hundreds },
              { label: "Highest Score", value: player.highestScore },
              { label: "Age", value: player.age },
            ].map((s) => (
              <div key={s.label} className={styles.statItem}>
                <p className={styles.statVal}>{s.value}</p>
                <p className={styles.statLbl}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bowling Stats (show only if wickets > 0) */}
        {player.wickets > 0 && (
          <div className={styles.statsBox}>
            <h2 className={styles.boxTitle}>Bowling Stats</h2>
            <div className={styles.statsGrid2}>
              {[
                { label: "Wickets", value: player.wickets },
                { label: "Economy", value: player.economy },
              ].map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <p className={styles.statVal}>{s.value}</p>
                  <p className={styles.statLbl}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Radar Chart */}
        <div className={styles.statsBox}>
          <h2 className={styles.boxTitle}>Player Radar</h2>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: "var(--text2)", fontSize: 12 }} />
              <Radar name={player.name} dataKey="value" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.25} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.compareHint}>
        Want to compare?{" "}
        <Link to="/compare" className={styles.compareLink}>Go to Compare →</Link>
      </div>
    </div>
  );
}

export default PlayerDetail;
