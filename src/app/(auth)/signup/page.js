'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
// import { signupApi } from '@/services/authService';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
        if (!form.name.trim()) return 'Name is required';
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
            await signupApi(form);
            router.push('/login'); // redirect to login after signup
        } catch (e) {
            setError(e.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            mode="signup"
            form={form}
            error={error}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}
