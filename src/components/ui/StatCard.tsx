import React from 'react';

interface StatCardProps {
    icon: React.ReactElement;
    label: string;
    value: string | number;
    unit: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, unit }) => {
    return (
        <div className="relative p-3 rounded-xl shadow transition-all flex items-center overflow-hidden group bg-white">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-lg mr-4">

                <span className="text-emerald-500">
                    {icon}
                </span>

            </div>
            <div className="flex flex-col">
                <h3 className="text-gray-800 font-bold text-md">
                    {value} <span className='text-xs font-medium'>{unit}</span>
                </h3>
                <p className="text-xs text-gray-400">{label}</p>
            </div>
        </div>
    );
};