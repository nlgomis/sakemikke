// app/layout.js
"use client"
import './globals.css'
import { LanguageProvider } from './contexts/LanguageContext'
import Navigation from './components/Navigation'
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black overflow-x-hidden">
        <LanguageProvider>
          <Navigation />
          {/* Add padding-top to account for fixed navbar */}
          <div>
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}