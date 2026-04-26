import { useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";
import { getRoleColor } from "../../utils/helpers";
import styles from "./Compare.module.css";

function Compare() {
  const players = useSelector((s) => s.players.all);
  const [p1Id, setP1Id] = useState("");
  const [p2Id, setP2Id] = useState("");

  const player1 = players.find((p) => p.id === Number(p1Id));
  const player2 = players.find((p) => p.id === Number(p2Id));

  const chartData =
    player1 && player2
      ? [
          { stat: "Runs", [player1.name]: player1.runs, [player2.name]: player2.runs },
          { stat: "Avg", [player1.name]: player1.average, [player2.name]: player2.average },
          { stat: "SR", [player1.name]: player1.strikeRate, [player2.name]: player2.strikeRate },
          { stat: "Wickets", [player1.name]: player1.wickets, [player2.name]: player2.wickets },
          { stat: "Matches", [player1.name]: player1.matches, [player2.name]: player2.matches },
        ]
      : [];

  const isBetter = (key, p1, p2) => {
    if (!p1 || !p2) return null;
    return p1[key] > p2[key] ? "p1" : p2[key] > p1[key] ? "p2" : "tie";
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>HEAD TO HEAD COMPARE</h1>
      <p className={styles.sub}>Select two players to compare their stats side by side</p>

      {/* Selector */}
      <div className={styles.selectors}>
        <div className={styles.selectorBox}>
          <label>Player 1</label>
          <select
            className={styles.select}
            value={p1Id}
            onChange={(e) => setP1Id(e.target.value)}
          >
            <option value="">-- Select Player --</option>
            {players.filter((p) => p.id !== Number(p2Id)).map((p) => (
              <option key={p.id} value={p.id}>{p.name} ({p.team})</option>
            ))}
          </select>
        </div>

        <div className={styles.vsText}>VS</div>

        <div className={styles.selectorBox}>
          <label>Player 2</label>
          <select
            className={styles.select}
            value={p2Id}
            onChange={(e) => setP2Id(e.target.value)}
          >
            <option value="">-- Select Player --</option>
            {players.filter((p) => p.id !== Number(p1Id)).map((p) => (
              <option key={p.id} value={p.id}>{p.name} ({p.team})</option>
            ))}
          </select>
        </div>
      </div>

      {!player1 || !player2 ? (
        <div className={styles.hint}>
          <span>👆</span>
          <p>Select both players to see the comparison</p>
        </div>
      ) : (
        <>
          {/* Player headers */}
          <div className={styles.compareHeader}>
            <div className={styles.playerHero} style={{ borderColor: "var(--accent)" }}>
              <span className={styles.playerEmoji}>{player1.image}</span>
              <div>
                <h2 className={styles.playerName}>{player1.name}</h2>
                <p className={styles.playerTeam}>{player1.team}</p>
                <span
                  className={styles.roleBadge}
                  style={{ background: getRoleColor(player1.role) + "22", color: getRoleColor(player1.role) }}
                >
                  {player1.role}
                </span>
              </div>
            </div>

            <div className={styles.overallWinner}>
              {player1.rating > player2.rating ? player1.name.split(" ")[0] :
               player2.rating > player1.rating ? player2.name.split(" ")[0] : "Tied"}
              <span>Higher Rating</span>
            </div>

            <div className={styles.playerHero} style={{ borderColor: "var(--blue)", textAlign: "right" }}>
              <div style={{ textAlign: "right" }}>
                <h2 className={styles.playerName}>{player2.name}</h2>
                <p className={styles.playerTeam}>{player2.team}</p>
                <span
                  className={styles.roleBadge}
                  style={{ background: getRoleColor(player2.role) + "22", color: getRoleColor(player2.role) }}
                >
                  {player2.role}
                </span>
              </div>
              <span className={styles.playerEmoji}>{player2.image}</span>
            </div>
          </div>

          {/* Stat rows */}
          <div className={styles.statTable}>
            {[
              { key: "matches", label: "Matches" },
              { key: "runs", label: "Total Runs" },
              { key: "average", label: "Batting Average" },
              { key: "strikeRate", label: "Strike Rate" },
              { key: "fifties", label: "Half Centuries" },
              { key: "hundreds", label: "Centuries" },
              { key: "wickets", label: "Wickets" },
              { key: "rating", label: "Overall Rating" },
            ].map(({ key, label }) => {
              const better = isBetter(key, player1, player2);
              return (
                <div key={key} className={styles.statRow}>
                  <span className={`${styles.statVal} ${better === "p1" ? styles.betterVal : ""}`}>
                    {player1[key]}
                  </span>
                  <span className={styles.statLabel}>{label}</span>
                  <span className={`${styles.statVal} ${better === "p2" ? styles.betterVal : ""}`}>
                    {player2[key]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bar chart */}
          <div className={styles.chartBox}>
            <h2 className={styles.chartTitle}>Visual Comparison</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="stat" stroke="var(--text2)" tick={{ fontSize: 12 }} />
                <YAxis stroke="var(--text2)" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--text)"
                  }}
                />
                <Legend />
                <Bar dataKey={player1.name} fill="var(--accent)" radius={[4, 4, 0, 0]} />
                <Bar dataKey={player2.name} fill="var(--blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Compare;
