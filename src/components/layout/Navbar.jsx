import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/uiSlice";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/players", label: "Players" },
  { path: "/teams", label: "Teams" },
  { path: "/matches", label: "Matches" },
  { path: "/compare", label: "Compare" },
  { path: "/favourites", label: "Favourites ⭐" },
];

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.ui);
  const favCount = useSelector((state) => state.players.favourites.length);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        <span className={styles.logo}>🏏</span>
        <span className={styles.brandName}>StatsXplorer</span>
      </Link>

      <div className={styles.links}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className={`${styles.link} ${location.pathname === l.path ? styles.active : ""}`}
          >
            {l.label}
            {l.path === "/favourites" && favCount > 0 && (
              <span className={styles.badge}>{favCount}</span>
            )}
          </Link>
        ))}
      </div>

      <button
        className={styles.themeBtn}
        onClick={() => dispatch(toggleDarkMode())}
        title="Toggle theme"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}

export default Navbar;
