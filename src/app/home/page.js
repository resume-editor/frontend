'use client';
import { useEffect, useState } from 'react';
import ResumeCard from '../../components/ResumeCard';
import { getHomeData } from '../../services/homeService';
import '../../styles/home.css';

export default function HomePage() {
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        getHomeData().then(setTemplates);
    }, []);

    return (
        <main className="home-content">
            <h3 className="page-title">Resume Templates</h3>

            <div className="row g-4">
                {templates.map(t => (
                    <ResumeCard key={t.id} template={t} />
                ))}
            </div>
        </main>
    );
}
