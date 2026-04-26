import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleFavourite } from "../../store/playersSlice";
import { getRoleColor } from "../../utils/helpers";
import styles from "./PlayerCard.module.css";

function PlayerCard({ player }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.avatar}>{player.image}</span>
        <div>
          <h3 className={styles.name}>{player.name}</h3>
          <p className={styles.team}>{player.team}</p>
        </div>
        <button
          className={`${styles.favBtn} ${player.isFav ? styles.favActive : ""}`}
          onClick={() => dispatch(toggleFavourite(player.id))}
          title={player.isFav ? "Remove from favourites" : "Add to favourites"}
        >
          {player.isFav ? "⭐" : "☆"}
        </button>
      </div>

      <div className={styles.roleBadge} style={{ background: getRoleColor(player.role) + "22", color: getRoleColor(player.role) }}>
        {player.role}
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{player.matches}</span>
          <span className={styles.statLbl}>Matches</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{player.runs.toLocaleString()}</span>
          <span className={styles.statLbl}>Runs</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{player.wickets}</span>
          <span className={styles.statLbl}>Wickets</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statVal}>{player.average}</span>
          <span className={styles.statLbl}>Avg</span>
        </div>
      </div>

      <div className={styles.ratingBar}>
        <span className={styles.ratingLbl}>Rating</span>
        <div className={styles.barOuter}>
          <div
            className={styles.barInner}
            style={{ width: `${player.rating}%` }}
          />
        </div>
        <span className={styles.ratingVal}>{player.rating}</span>
      </div>

      <Link to={`/players/${player.id}`} className={styles.viewBtn}>
        View Profile →
      </Link>
    </div>
  );
}

export default PlayerCard;
