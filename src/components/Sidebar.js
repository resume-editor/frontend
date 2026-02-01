'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/sidebar.css';
import { fetchSidebarData } from '@/services/homeService';

const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 400;

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const debounceRef = useRef(null);

  const loadProjects = async (pageNo = 1, reset = false) => {
    if (loading || (!hasNext && !reset)) return;

    try {
      setLoading(true);

      const res = await fetchSidebarData(pageNo, PAGE_SIZE, search);

      const payload = res.data;

      setProjects(prev =>
        reset ? payload.data : [...prev, ...payload.data]
      );

      setHasNext(payload.has_next);
      setPage(pageNo);
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Failed to load your projects'
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL + SEARCH ================= */

  useEffect(() => {
    loadProjects(1, true);
  }, []);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setProjects([]);
      setHasNext(true);
      loadProjects(1, true);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      loadProjects(page + 1);
    }
  };

  return (
    <>
      {/* Hamburger */}
      <button
        className={`sidebar-hamburger ${open ? 'hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>My Projects</h2>

          <button
            className="close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          className="sidebar-search"
          placeholder="Search resumes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Scrollable content */}
        <nav className="sidebar-nav" onScroll={handleScroll}>
          {error && <span className="error-text">{error}</span>}

          {projects.map((project) => (
            <button
              key={project.id}
              className="sidebar-item"
              onClick={() => {
                console.log('Clicked', project.id);
                setOpen(false);
              }}
            >
              <span className="sidebar-item-title">
                {project.template?.name}
              </span>

              <span className="sidebar-item-meta">
                Last modified •{' '}
                {new Date(project.updated_on).toLocaleString()}
              </span>
            </button>
          ))}

          {loading && (
            <span className="sidebar-loading">Loading…</span>
          )}

          {!hasNext && !loading && projects.length > 0 && (
            <span className="sidebar-end">
              No more projects
            </span>
          )}

          {/* Static item */}
          <button className="sidebar-item">Settings</button>
        </nav>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
