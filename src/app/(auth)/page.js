'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/auth.css';
import { signInApi } from '@/services/authService';

export default function AuthPage() {
    const router = useRouter();
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (mode === 'signup' && !form.name.trim()) return 'Name is required';
        if (!form.email.includes('@')) return 'Enter a valid email';
        if (form.password.length < 6) return 'Password must be at least 6 characters';
        return '';
    };

    const handleSubmit = async () => {
        const err = validate();
        if (err) return setError(err);

        setError('');
        setLoading(true);

        try {

            console.log('Mode: ', mode)
            if (mode == 'login') {
                console.log('Logging in')
                const data = await signInApi({ email: form.email, password: form.password })
                if (data.access_token) {
                    router.push('/home')
                }
            } else {
                await signup(form);
                setMode('login')
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h4 className="auth-title">
                    {mode === 'login' ? 'Login' : 'Create Account'}
                </h4>

                {mode === 'signup' && (
                    <input
                        className="form-control mb-3"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                )}

                <input
                    className="form-control mb-3"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <button
                    type='button'
                    className="btn btn-primary w-100"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Sign Up'}
                </button>

                <div className="auth-switch">
                    {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <span onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                        {mode === 'login' ? 'Sign up' : 'Login'}
                    </span>
                </div>
            </div>
        </div>
    );
}
