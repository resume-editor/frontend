'use client';
import '../styles/auth.css'

export default function AuthForm({ mode, form, error, loading, onChange, onSubmit }) {
    return (
        <div className="auth-card">
            <h4 className="auth-title">{mode === 'login' ? 'Login' : 'Create Account'}</h4>

            {mode === 'signup' && (
                <input
                    className="form-control mb-3"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={onChange}
                />
            )}

            <input
                className="form-control mb-3"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
            />

            <input
                className="form-control mb-3"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
            />

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <button
                type="button"
                className="btn btn-primary w-100"
                disabled={loading}
                onClick={onSubmit}
            >
                {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Sign Up'}
            </button>
        </div>

    );
}
