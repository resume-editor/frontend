'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import { signInApi } from '@/services/authService';

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
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
            const data = await signInApi({ email: form.email, password: form.password });
            console.log('Login Data: ', data)
            if (data?.data?.access_token) {
                localStorage.setItem('access_token', data.data.access_token)
                router.push('/home');
            }
        } catch (error) {
            setError(error.response?.data?.message || e.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            mode="login"
            form={form}
            error={error}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}
