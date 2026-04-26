export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getRoleColor(role) {
  const map = {
    Batsman: "#3b82f6",
    Bowler: "#ef4444",
    "All-Rounder": "#10b981",
    "Wicket-Keeper": "#f59e0b",
  };
  return map[role] || "#6b7280";
}

export function getWinRate(wins, losses) {
  const total = wins + losses;
  if (total === 0) return 0;
  return ((wins / total) * 100).toFixed(1);
}
