'use client';
import { useState } from 'react';
import { login } from '../../services/authService';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        const res = await login({ email, password });
        if (res.success) {
            router.push('/home');
        }
    };


    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-4 col-12 col-sm-8 col-md-5 col-lg-4">
                <h4 className="text-center mb-4">Login</h4>


                <input
                    className="form-control mb-3"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />


                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />


                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">Remember me</label>
                </div>


                <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                    Login
                </button>


                <p className="text-center mb-0">
                    Don’t have an account?{' '}
                    <span
                        className="text-primary"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push('/signup')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}