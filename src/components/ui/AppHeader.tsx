import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";
import { IoArrowBack, IoNotifications } from "react-icons/io5";

export const AppHeader: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAppData();

    const mainPages = ['/', '/stats', '/profile'];
    const showHomeHeader = mainPages.includes(location.pathname);

    return (
        <header className="bg-transparent p-6 sm:p-8">
            <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
                <div className="h-16 flex items-center justify-between">
                    {showHomeHeader ? (
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white shadow-md text-sm">
                                EMS
                            </div>
                            <span className="text-sm font-thin text-white drop-shadow">
                                {user ? user.email : '...'}
                            </span>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                            aria-label="Kembali"
                        >
                            <IoArrowBack className="w-6 h-6" />
                        </button>
                    )}

                    <nav>
                        <ul className="flex items-center gap-5 text-sm text-white/90">
                            <li>
                                <Link to="/" className="transition hover:text-white">
                                    <div className="relative">
                                        <IoNotifications className="w-6 h-6" />
                                        <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full"></span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 border border-white/30 transition">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                </div>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};