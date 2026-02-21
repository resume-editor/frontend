'use client';

import { useEffect, useState } from 'react';
import '../../styles/settings.css';
import {
    fetchUserProfile,
    updateUserProfile,
    changePassword
} from '@/services/settingsService';
import { changePasswordSchema, updateProfileSchema } from '@/utils/validationSchema';

export default function SettingsPage() {
    /* ================= PROFILE ================= */
    const [form, setForm] = useState({
        name: '',
        email: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');

    /* ================= PASSWORD ================= */
    const [passwordForm, setPasswordForm] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    });

    const [pwdSaving, setPwdSaving] = useState(false);
    const [pwdError, setPwdError] = useState('');
    const [pwdSuccess, setPwdSuccess] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await fetchUserProfile();
                const user = res.data;

                setForm({
                    name: user.name || '',
                    email: user.email || '',
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    /* ================= HANDLERS ================= */

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePasswordChange = (e) => {
        setPasswordForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        setSuccess('');
        setFormErrors({})

        const { error } = updateProfileSchema.validate(form, {
            abortEarly: false,
        });

        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                const field = detail.path[0];
                errors[field] = detail.message;
            });

            setFormErrors(errors);
            setSaving(false);
            return;
        }

        try {
            await updateUserProfile(form);
            setSuccess('Profile updated successfully');
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        setPwdError('');
        setPwdSuccess('');

        const { current_password, new_password, confirm_password } = passwordForm;

        const { error } = changePasswordSchema.validate(passwordForm, {
            abortEarly: false
        })

        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                const field = detail.path[0];
                errors[field] = detail.message;
            });

            setFormErrors(errors);
            setSaving(false);
            return;
        }

        if (new_password !== confirm_password) {
            setPwdError('Passwords do not match');
            return;
        }

        setPwdSaving(true);

        try {
            await changePassword({
                current_password,
                new_password,
                confirm_password
            });

            setPwdSuccess('Password updated successfully');
            setPasswordForm({
                current_password: '',
                new_password: '',
                confirm_password: '',
            });
        } catch (err) {
            setPwdError(
                err?.response?.data?.message || 'Failed to update password'
            );
        } finally {
            setPwdSaving(false);
        }
    };

    if (loading) return <p>Loading profile…</p>;

    return (
        <div className="settings-container">
            <h2>Account Settings</h2>

            <div className="settings-grid">
                {/* ================= PROFILE ================= */}
                <div className="settings-card">
                    <h3>Profile</h3>

                    <label>
                        Name
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {formErrors.name && (
                            <span className="error-text">{formErrors.name}</span>
                        )}
                    </label>

                    <label>
                        Email
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && (
                            <span className="error-text">{formErrors.email}</span>
                        )}
                    </label>

                    <button
                        className="btn btn-primary"
                        onClick={handleSaveProfile}
                        disabled={saving}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>

                    {success && <p className="success-text">{success}</p>}
                </div>

                {/* ================= PASSWORD ================= */}
                <div className="settings-card">
                    <h3>Change Password</h3>

                    <label>
                        Current Password
                        <input
                            type="password"
                            name="current_password"
                            value={passwordForm.current_password}
                            onChange={handlePasswordChange}
                        />
                        {formErrors.current_password && (
                            <span className="error-text">{formErrors.current_password}</span>
                        )}
                    </label>

                    <label>
                        New Password
                        <input
                            type="password"
                            name="new_password"
                            value={passwordForm.new_password}
                            onChange={handlePasswordChange}
                        />
                        {formErrors.new_password && (
                            <span className="error-text">{formErrors.new_password}</span>
                        )}
                    </label>

                    <label>
                        Confirm Password
                        <input
                            type="password"
                            name="confirm_password"
                            value={passwordForm.confirm_password}
                            onChange={handlePasswordChange}
                        />
                        {formErrors.confirm_password && (
                            <span className="error-text">{formErrors.confirm_password}</span>
                        )}
                    </label>

                    <button
                        className="btn btn-primary"
                        onClick={handleChangePassword}
                        disabled={pwdSaving}
                    >
                        {pwdSaving ? 'Updating...' : 'Update Password'}
                    </button>

                    {pwdError && <p className="error-text">{pwdError}</p>}
                    {pwdSuccess && <p className="success-text">{pwdSuccess}</p>}
                </div>
            </div>
        </div>
    );
}
