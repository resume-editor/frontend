import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '../styles/theme.css';
import '../styles/button.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
