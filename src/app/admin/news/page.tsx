import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

const adminClient = createClient();

export default function AdminNewsPage() {
    const router = useRouter();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchNews() {
            try {
                const { data, error } = await adminClient.from('news').select('*');
                if (error) throw error;
                setNews(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }

        async function checkSession() {
            try {
                const { data, error } = await adminClient.auth.getSession();
                if (error || !data.session) {
                    router.push('/login');
                } else {
                    fetchNews();
                }
            } catch (error) {
                console.error(error);
                router.push('/login');
            }
        }

        checkSession();
    }, [router]);

    async function deleteNews(id) {
        try {
            const { error } = await adminClient.from('news').delete().eq('id', id);
            if (error) throw error;
            setNews(news.filter(n => n.id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Admin News Dashboard</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                {/* Add News Form */}
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required />
                <label htmlFor="content">Content:</label>
                <textarea id="content" name="content" required></textarea>
                <button type="submit">Add News</button>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {news.map((n) => (
                        <li key={n.id}>
                            {n.title}
                            <button onClick={() => deleteNews(n.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}