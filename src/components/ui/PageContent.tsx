import React from 'react';

interface PageContentProps {
    children: React.ReactNode;
}

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
    return (
        <section className="bg-gray-100 rounded-t-3xl shadow-inner flex-1 min-h-[calc(100vh-12rem)] p-4 sm:p-8 h-full">
            <div className="max-w-7xl mx-auto w-full h-full">
                {children}
            </div>
        </section>
    );
};