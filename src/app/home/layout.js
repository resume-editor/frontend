import Sidebar from '@/components/Sidebar';
import '../../styles/homeLayout.css';

export default function HomeLayout({ children }) {
    return (
        <>
            <Sidebar />
            <main className="home-main">
                {children}
            </main>
        </>
    );
}
