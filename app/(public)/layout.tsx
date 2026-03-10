import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Chatbot from '../../components/Chatbot';
import FloatingCTA from '../../components/FloatingCTA';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Chatbot />
            <FloatingCTA />
            <Footer />
        </>
    );
}
