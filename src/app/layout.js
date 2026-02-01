import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import '../styles/theme.css';
import '../styles/button.css';

import { TemplateProvider } from '@/context/TemplateContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TemplateProvider>
          {children}
        </TemplateProvider>
      </body>
    </html>
  );
}
