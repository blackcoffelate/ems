import React from 'react'
import { Outlet } from 'react-router-dom'

// type Props = {
//     children: React.ReactNode
// }

export const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white px-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold">MyPWA</h1>
                    <p className="text-sm text-gray-500">Aplikasi PWA contoh — masuk untuk melanjutkan</p>
                </div>

                {/* <div className="bg-white shadow-lg rounded-2xl p-6">{children}</div>
                 */}
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    <Outlet />
                </div>

                <footer className="mt-4 text-center text-xs text-gray-400">
                    © {new Date().getFullYear()} MyPWA. All rights reserved.
                </footer>
            </div>
        </div>
    )
}