import React from 'react';
import Navbar from './Navbar';
import { Toaster } from './ui/toaster';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shopping App. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <a href="https://fakestoreapi.com" className="underline" target="_blank" rel="noreferrer">
              Fake Store API
            </a>
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}

export default Layout; 