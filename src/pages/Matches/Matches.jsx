import { useSelector, useDispatch } from "react-redux";
import { setMatchFilter } from "../../store/matchesSlice";
import { formatDate } from "../../utils/helpers";
import styles from "./Matches.module.css";

function Matches() {
  const dispatch = useDispatch();
  const { all: matches, filter } = useSelector((s) => s.matches);
  const teams = useSelector((s) => s.teams.all.map((t) => t.name));

  const filtered =
    filter === "All" ? matches : matches.filter((m) => m.team1 === filter || m.team2 === filter);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>MATCHES</h1>

      {/* Filter by team */}
      <div className={styles.filterRow}>
        <button
          className={`${styles.filterBtn} ${filter === "All" ? styles.active : ""}`}
          onClick={() => dispatch(setMatchFilter("All"))}
        >
          All
        </button>
        {teams.map((t) => (
          <button
            key={t}
            className={`${styles.filterBtn} ${filter === t ? styles.active : ""}`}
            onClick={() => dispatch(setMatchFilter(t))}
          >
            {t.split(" ").map((w) => w[0]).join("")}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No matches found for this filter.</p>
        ) : (
          filtered.map((m) => (
            <div key={m.id} className={styles.matchCard}>
              <div className={styles.matchMeta}>
                <span className={styles.season}>{m.season}</span>
                <span className={styles.date}>{formatDate(m.date)}</span>
                <span className={styles.venue}>📍 {m.venue}</span>
              </div>

              <div className={styles.matchBody}>
                <div className={`${styles.teamSide} ${m.winner === m.team1 ? styles.winner : ""}`}>
                  <p className={styles.teamName}>{m.team1}</p>
                  <p className={styles.score}>{m.team1Score}</p>
                  {m.winner === m.team1 && <span className={styles.wonTag}>WON</span>}
                </div>

                <div className={styles.vs}>
                  <span>VS</span>
                </div>

                <div className={`${styles.teamSide} ${styles.teamRight} ${m.winner === m.team2 ? styles.winner : ""}`}>
                  <p className={styles.teamName}>{m.team2}</p>
                  <p className={styles.score}>{m.team2Score}</p>
                  {m.winner === m.team2 && <span className={styles.wonTag}>WON</span>}
                </div>
              </div>

              <div className={styles.matchFooter}>
                <p className={styles.result}>
                  🏆 <strong>{m.winner}</strong> won by {m.margin}
                </p>
                <p className={styles.highlight}>💬 {m.highlights}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Matches;
