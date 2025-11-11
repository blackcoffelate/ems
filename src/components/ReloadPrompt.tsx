// src/components/ReloadPrompt.tsx
import { useRegisterSW } from 'virtual:pwa-register/react'

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('SW Registered: ' + r)
        },
        onRegisterError(error) {
            console.log('SW registration error', error)
        },
    })

    const close = () => {
        setOfflineReady(false)
        setNeedRefresh(false)
    }

    if (offlineReady || needRefresh) {
        return (
            <div className="fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg bg-gray-800 text-white border border-gray-700">
                <div className="mb-3">
                    {offlineReady ? (
                        <span>Aplikasi siap digunakan offline.</span>
                    ) : (
                        <span>Versi baru tersedia, klik untuk update!</span>
                    )}
                </div>

                {needRefresh && (
                    <button
                        onClick={() => updateServiceWorker(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold mr-2"
                    >
                        Update
                    </button>
                )}

                <button
                    onClick={() => close()}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-light"
                >
                    Tutup
                </button>
            </div>
        )
    }

    return null
}

export default ReloadPrompt