import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

export interface ChartData {
    time: string;
    pvPower: number;
}

interface PowerChartProps {
    data: ChartData[];
}

export const PvPowerChart: React.FC<PowerChartProps> = ({ data }) => {
    return (
        <div className="w-full h-64 bg-white p-4 rounded-xl shadow">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 20,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                        dataKey="time"
                        fontSize={12}
                        tick={{ fill: '#6b7280' }}
                        stroke="#9ca3af"
                    />
                    <YAxis
                        fontSize={12}
                        tick={{ fill: '#6b7280' }}
                        stroke="#9ca3af"
                        label={{ value: 'Watt', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#f9fafb', fontWeight: 'bold' }}
                        itemStyle={{ color: '#34d399' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="pvPower"
                        stroke="#34d399"
                        fill="#34d399"
                        fillOpacity={0.3}
                        name="PV Power"
                        unit=" W"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};