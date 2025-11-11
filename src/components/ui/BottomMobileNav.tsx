import { Link, useLocation } from "react-router-dom";
import { useAppData } from "../../contexts/AppDataContext";
import { IoExit, IoGrid } from "react-icons/io5";

export const BottomMobileNav: React.FC = () => {
    const location = useLocation();
    const { logout } = useAppData();

    return (
        <nav className="fixed p-4 bottom-0 left-0 right-0 bg-transparent sm:hidden">
            <div className="max-w-md mx-auto flex justify-around items-center py-4 bg-white rounded-full shadow-lg">
                <Link
                    to="/"
                    className={`flex flex-col items-center text-xs ${location.pathname === "/" ? "text-blue-500" : "text-gray-500"
                        }`}
                >
                    <IoGrid className="w-5 h-5" />
                </Link>

                <button
                    type="button"
                    onClick={logout}
                    className="flex flex-col items-center text-xs text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Logout"
                >
                    <IoExit className="w-5 h-5" />
                </button>
            </div>
        </nav>
    );
};
