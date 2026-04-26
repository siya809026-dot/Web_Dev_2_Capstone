import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../../store/playersSlice";
import { Link } from "react-router-dom";
import { getRoleColor } from "../../utils/helpers";
import styles from "./Favourites.module.css";

function Favourites() {
  const dispatch = useDispatch();
  const favourites = useSelector((s) => s.players.favourites);

  if (favourites.length === 0) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>FAVOURITES</h1>
        <div className={styles.empty}>
          <span>⭐</span>
          <p>No favourite players yet</p>
          <p className={styles.emptySub}>Click the star icon on any player card to add them here</p>
          <Link to="/players" className={styles.goBtn}>Browse Players →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>FAVOURITES</h1>
        <span className={styles.count}>{favourites.length} player{favourites.length > 1 ? "s" : ""}</span>
      </div>

      <div className={styles.list}>
        {favourites.map((p) => (
          <div key={p.id} className={styles.row}>
            <span className={styles.avatar}>{p.image}</span>
            <div className={styles.info}>
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.team}>{p.team} · {p.country}</p>
            </div>
            <span
              className={styles.role}
              style={{ background: getRoleColor(p.role) + "22", color: getRoleColor(p.role) }}
            >
              {p.role}
            </span>
            <div className={styles.miniStats}>
              <span><strong>{p.runs.toLocaleString()}</strong> runs</span>
              <span><strong>{p.wickets}</strong> wkts</span>
              <span><strong>{p.average}</strong> avg</span>
            </div>
            <div className={styles.actions}>
              <Link to={`/players/${p.id}`} className={styles.viewBtn}>View</Link>
              <button
                className={styles.removeBtn}
                onClick={() => dispatch(toggleFavourite(p.id))}
                title="Remove from favourites"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
