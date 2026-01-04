'use client';
import { useState } from 'react';

export default function EditorSection({ title, children }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="editor-section">
            <button
                className="section-header"
                onClick={() => setOpen(!open)}
            >
                <span>{title}</span>
                <span>{open ? '−' : '+'}</span>
            </button>

            {open && <div className="section-body">{children}</div>}
        </div>
    );
}
