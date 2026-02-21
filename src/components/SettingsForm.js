'use client';

import { useState } from 'react';

export default function SettingsForm({ user }) {
    const [form, setForm] = useState({
        name: user.name || '',
        email: user.email || '',
    });

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setSaving(true);
        setSuccess('');

        const res = await fetch('/api/user/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        setSaving(false);

        if (res.ok) {
            setSuccess('Profile updated successfully');
        }
    };

    return (
        <div className="settings-card">
            <label>
                Name
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />
            </label>

            <label>
                Email
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </label>

            <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
            >
                {saving ? 'Saving...' : 'Save Changes'}
            </button>

            {success && <p className="success-text">{success}</p>}
        </div>
    );
}
