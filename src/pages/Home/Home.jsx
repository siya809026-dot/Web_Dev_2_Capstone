import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { LEADERBOARD } from "../../data/mockData";
import styles from "./Home.module.css";

const QUICK_STATS = [
  { label: "Total Teams", value: "6", icon: "🏟️" },
  { label: "Total Players", value: "8", icon: "👤" },
  { label: "Matches Tracked", value: "6", icon: "🏏" },
  { label: "Seasons Covered", value: "1", icon: "🏆" },
];

const chartData = LEADERBOARD.topRunScorers.map((p) => ({
  name: p.name.split(" ")[1] || p.name,
  runs: p.runs,
}));

function Home() {
  const favCount = useSelector((s) => s.players.favourites.length);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>IPL STATS XPLORER</h1>
          <p className={styles.heroSub}>
            Explore IPL player stats, team analytics, and match results — all in one place.
          </p>
          <div className={styles.heroBtns}>
            <Link to="/players" className={styles.btnPrimary}>Explore Players</Link>
            <Link to="/teams" className={styles.btnSecondary}>View Teams</Link>
          </div>
        </div>
        <div className={styles.heroBg}>🏏</div>
      </div>

      {/* Quick Stats */}
      <div className={styles.statsGrid}>
        {QUICK_STATS.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statIcon}>{s.icon}</span>
            <div>
              <p className={styles.statNum}>{s.value}</p>
              <p className={styles.statLabel}>{s.label}</p>
            </div>
          </div>
        ))}
        <div className={`${styles.statCard} ${styles.accentCard}`}>
          <span className={styles.statIcon}>⭐</span>
          <div>
            <p className={styles.statNum}>{favCount}</p>
            <p className={styles.statLabel}>Your Favourites</p>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className={styles.chartsRow}>
        <div className={styles.chartBox}>
          <h2 className={styles.chartTitle}>Top Run Scorers (IPL All Time)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" stroke="var(--text2)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--text2)" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text)",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="runs" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.leaderBox}>
          <h2 className={styles.chartTitle}>Top Wicket Takers</h2>
          <div className={styles.leaderList}>
            {LEADERBOARD.topWicketTakers.map((p) => (
              <div key={p.name} className={styles.leaderRow}>
                <span className={styles.rank}>#{p.rank}</span>
                <div className={styles.leaderInfo}>
                  <span className={styles.leaderName}>{p.name}</span>
                  <span className={styles.leaderTeam}>{p.team}</span>
                </div>
                <span className={styles.leaderStat}>{p.wickets} wkts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick nav cards */}
      <div className={styles.navCards}>
        {[
          { path: "/players", title: "Players", desc: "Browse & filter all IPL players", icon: "👤" },
          { path: "/teams", title: "Teams", desc: "Check team stats and win rates", icon: "🏟️" },
          { path: "/matches", title: "Matches", desc: "Recent match results and highlights", icon: "📋" },
          { path: "/compare", title: "Compare", desc: "Head-to-head player comparison", icon: "⚖️" },
        ].map((c) => (
          <Link to={c.path} key={c.path} className={styles.navCard}>
            <span className={styles.navCardIcon}>{c.icon}</span>
            <h3 className={styles.navCardTitle}>{c.title}</h3>
            <p className={styles.navCardDesc}>{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
