import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredPlayers,
  setSearch,
  setFilterRole,
  setSortBy,
  setSortOrder,
} from "../../store/playersSlice";
import useDebounce from "../../hooks/useDebounce";
import PlayerCard from "../../components/ui/PlayerCard";
import styles from "./Players.module.css";

const ROLES = ["All", "Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"];
const SORT_OPTIONS = [
  { value: "name", label: "Name" },
  { value: "runs", label: "Runs" },
  { value: "wickets", label: "Wickets" },
  { value: "average", label: "Average" },
  { value: "rating", label: "Rating" },
];

const PAGE_SIZE = 6;

function Players() {
  const dispatch = useDispatch();
  const players = useSelector(selectFilteredPlayers);
  const { filterRole, sortBy, sortOrder } = useSelector((s) => s.players);

  const [inputVal, setInputVal] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(inputVal, 400);

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
    setPage(1);
  }, [debouncedSearch, dispatch]);

  const totalPages = Math.ceil(players.length / PAGE_SIZE);
  const pagePlayers = players.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>PLAYERS</h1>
        <span className={styles.count}>{players.length} found</span>
      </div>

      {/* Filters bar */}
      <div className={styles.controls}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by name, team..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />

        <div className={styles.roleFilter}>
          {ROLES.map((r) => (
            <button
              key={r}
              className={`${styles.roleBtn} ${filterRole === r ? styles.roleActive : ""}`}
              onClick={() => { dispatch(setFilterRole(r)); setPage(1); }}
            >
              {r}
            </button>
          ))}
        </div>

        <div className={styles.sortGroup}>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            className={styles.orderBtn}
            onClick={() => dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))}
            title="Toggle sort order"
          >
            {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
          </button>
        </div>
      </div>

      {/* Grid */}
      {pagePlayers.length === 0 ? (
        <div className={styles.empty}>
          <p>No players match your search 🏏</p>
          <button onClick={() => { setInputVal(""); dispatch(setSearch("")); dispatch(setFilterRole("All")); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {pagePlayers.map((p) => (
            <PlayerCard key={p.id} player={p} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`${styles.pageBtn} ${page === i + 1 ? styles.activePage : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Players;
