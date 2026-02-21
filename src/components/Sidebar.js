'use client';

import { useEffect, useRef, useState } from 'react';
import '../styles/sidebar.css';
import { deleteProject, fetchSidebarData, updateUserTemplate } from '@/services/homeService';

const PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 400;

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [renameState, setRenameState] = useState({
    id: null,
    name: ''
  });



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

  useEffect(() => {
    const close = () => setActiveMenu(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const handleRenameStart = (project) => {
    setRenameState({
      id: project.id,
      name: project.name || ''
    });
    setActiveMenu(null);
  };

  const handleRenameChange = (e) => {
    setRenameState(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleDeleteProject = async (project) => {
    const { id } = project

    if (!id) return

    try {
      await deleteProject({ id })

      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error delelting project: ', error)
    }
  };


  const handleRenameSubmit = async () => {
    const { id, name } = renameState;

    if (!id) return;

    try {
      await updateUserTemplate(id, { name })

      setProjects(prev =>
        prev.map(p =>
          p.id === id
            ? {
              ...p,
              name: name,
            }
            : p
        )
      );

      setRenameState({ id: null, name: '' });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!renameState.id) return;

    const handleClickOutside = () => {
      setRenameState({ id: null, name: '' });
    };

    window.addEventListener('click', handleClickOutside);
    return () =>
      window.removeEventListener('click', handleClickOutside);
  }, [renameState.id]);


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
            <div
              key={project.id}
              className="sidebar-item"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (renameState.id === project.id) return;
                console.log('Clicked', project.id);
                setOpen(false);
              }}
            >
              {/* LEFT: title + rename */}
              <div className="sidebar-item-content">
                {renameState.id === project.id ? (
                  <div
                    className="rename-wrapper"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      className="rename-input"
                      value={renameState.name}
                      onChange={handleRenameChange}
                      autoFocus
                      maxLength={30}
                      onKeyDown={(e) => {
                        if (e.key === ' ') {
                          e.stopPropagation();
                        }
                      }}
                    />

                    <button
                      className="rename-save"
                      onClick={handleRenameSubmit}
                      aria-label="Save"
                    >
                      ✓
                    </button>
                  </div>
                ) : (
                  <span className="sidebar-item-title">
                    {project?.name}
                  </span>
                )}


                <span className="sidebar-item-meta">
                  Last modified •{' '}
                  {new Date(project.updated_on).toLocaleString()}
                </span>
              </div>

              {/* RIGHT: 3-dot menu */}
              <div className="sidebar-item-actions">
                <button
                  className="dots-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(
                      activeMenu === project.id ? null : project.id
                    );
                  }}
                >
                  ⋮
                </button>

                {activeMenu === project.id && (
                  <div className="item-menu">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRenameStart(project);
                      }}
                    >
                      Rename
                    </button>

                    <button
                      className="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}


          {loading && (
            <span className="sidebar-loading">Loading…</span>
          )}

          {!hasNext && !loading && projects.length > 0 && (
            <span className="sidebar-end">
              No more projects
            </span>
          )}
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
