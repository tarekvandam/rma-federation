'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
            if (signInError) {
                setError(signInError.message);
                setLoading(false);
                return;
            }

            router.push('/admin/news');
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
            setLoading(false);
        }
    }

    async function handleSignUp(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            const { error: signUpError } = await supabase.auth.signUp({ email, password });
            if (signUpError) {
                setError(signUpError.message);
                setLoading(false);
                return;
            }

            router.push('/admin/news');
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
            setLoading(false);
        }
    }

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                if (data.session) router.push('/admin/news');
            } catch (err) {
                console.error(err);
            }
        };

        checkSession();
    }, [router]);

    return (
        <div>
            <h1>Admin Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>Login</button>
            </form>

            <p>Don't have an account?</p>
            <form onSubmit={handleSignUp}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>Sign Up</button>
            </form>
        </div>
    );
}