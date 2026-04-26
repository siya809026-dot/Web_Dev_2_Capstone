import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getWinRate } from "../../utils/helpers";
import styles from "./Teams.module.css";

function Teams() {
  const teams = useSelector((s) => s.teams.all);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>TEAMS</h1>
      <p className={styles.sub}>IPL Franchise Overview</p>

      <div className={styles.grid}>
        {teams.map((team) => {
          const winRate = getWinRate(team.wins, team.losses);
          return (
            <div key={team.id} className={styles.card} style={{ "--team-color": team.color }}>
              <div className={styles.cardTop}>
                <span className={styles.logo}>{team.logo}</span>
                <div>
                  <h2 className={styles.teamName}>{team.name}</h2>
                  <p className={styles.shortName}>{team.shortName} • Est. {team.founded}</p>
                </div>
                {team.titles > 0 && (
                  <div className={styles.titlesBadge}>
                    🏆 {team.titles}x
                  </div>
                )}
              </div>

              <p className={styles.desc}>{team.description}</p>

              <div className={styles.infoRow}>
                <span className={styles.infoItem}>📍 {team.homeGround}</span>
              </div>

              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{team.wins}</span>
                  <span className={styles.statLbl}>Wins</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum}>{team.losses}</span>
                  <span className={styles.statLbl}>Losses</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNum} style={{ color: "var(--green)" }}>{winRate}%</span>
                  <span className={styles.statLbl}>Win Rate</span>
                </div>
              </div>

              <div className={styles.winBar}>
                <div className={styles.winFill} style={{ width: `${winRate}%`, background: team.color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Teams;
