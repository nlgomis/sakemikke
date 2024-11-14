// app/layout.js

"use client"

import './globals.css'
import Navigation from './components/Navigation'

import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'

function ClientWrapper({ children }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LanguageProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black overflow-x-hidden">
        <ClientWrapper>
          <Navigation />
          <div>
            {children}
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}