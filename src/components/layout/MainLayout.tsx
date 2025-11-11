import React from "react";
import { BottomMobileNav } from "../ui/BottomMobileNav";
import { AppHeader } from "../ui/AppHeader";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-t from-gray-100 via-gray-100 to-blue-800 flex flex-col">

            <AppHeader />

            <main className="flex-1 pb-24 sm:pb-0">
                <div className="max-w-7xl mx-auto">
                    <div className="h-fit flex flex-col">
                        {children}
                    </div>
                </div>
            </main>

            <BottomMobileNav />

        </div>
    );
};