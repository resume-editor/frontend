'use client';
import { useState } from 'react';
import '../styles/sidebar.css';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger – ALWAYS rendered */}
      <button
        className={`sidebar-hamburger ${open ? 'hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* Sidebar – SINGLE instance */}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>My Projects</h2>

          {/* Close button (mobile only via CSS) */}
          <button
            className="close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <button className="sidebar-item">Project 1</button>
          <button className="sidebar-item">Project 2</button>
          <button className="sidebar-item">Settings</button>
        </nav>
      </aside>

      {/* Overlay */}
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
