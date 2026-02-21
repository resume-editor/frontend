'use client';
import { useEffect, useState } from 'react';
import ResumeCard from '../../components/ResumeCard';
import { fetchHomeData } from '../../services/homeService';
import '../../styles/home.css';
import Link from 'next/link';

export default function HomePage() {
    const [templates, setTemplates] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageSize = 12;

    const loadTemplates = async (page = 1, name = '') => {
        setLoading(true);
        try {
            const res = await fetchHomeData(page, pageSize, name);
            setTemplates(res.data.data); // array of templates
            setCurrentPage(res.data.current_page);
            setTotalPages(res.data.total_pages);
        } catch (err) {
            console.error('Failed to fetch templates', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        loadTemplates();
    }, []);

    // Handle search submit
    const handleSearch = (e) => {
        e.preventDefault();
        loadTemplates(1, search);
    };

    // Pagination handlers
    const handlePrev = () => {
        if (currentPage > 1) loadTemplates(currentPage - 1, search);
    };

    const handleNext = () => {
        if (currentPage < totalPages) loadTemplates(currentPage + 1, search);
    };

    return (
        <main className="home-content">
            {/* Settings Icon (Home only) */}
            <Link href="/settings" className="settings-icon">
                <img
                    src="/public/settings.png"
                    alt="Settings"
                    className="settings-icon-img"
                />
            </Link>

            <h3 className="page-title">Resume Templates</h3>

            {/* Search bar */}
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="form-control"
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>

            {/* Template grid */}
            <div className="row g-4">
                {loading
                    ? <p>Loading...</p>
                    : templates.map((t) => <ResumeCard key={t.id} template={t} />)}
            </div>

            {/* Pagination */}
            <div className="pagination-controls">
                <button
                    className="btn btn-outline-primary"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-outline-primary"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </main>
    );
}
