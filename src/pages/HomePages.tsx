// /* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import type { DeviceLog } from '../types/DeviceLog';
import { usePusher } from '../hooks/usePusher';
import { FiBatteryCharging } from "react-icons/fi";
import { GiElectric } from "react-icons/gi";
import { useAppData } from '../contexts/AppDataContext';
import { useDeviceMetrics } from '../hooks/useDeviceMetrics';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { PageContent } from '../components/ui/PageContent';
import { RealtimeStats } from '../components/ui/RealtimeStats';
import { StatCard } from '../components/ui/StatCard';
import { PvPowerChart, type ChartData } from '../components/ui/PowerChart';

const formatLogForChart = (log: DeviceLog): ChartData => {
    const pvPower = log.data.charge_current_value * log.data.pv_value_raw;

    return {
        time: new Date(log.created_at).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        }),
        pvPower: pvPower,
    };
};

export const HomePage: React.FC = () => {
    const { user, isLoading: isUserLoading, error: userError } = useAppData();
    const { deviceLogs } = usePusher();
    const [latestLog, setLatestLog] = useState<DeviceLog | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const metrics = useDeviceMetrics(latestLog);
    
    useEffect(() => {
        if (user && chartData.length === 0) {
            let initialLogs: DeviceLog[] = [];

            for (const cluster of user.clusters) {
                for (const device of cluster.devices) {
                    if (device.logs && device.logs.length > 0) {
                        initialLogs = device.logs;
                        break;
                    }
                }
                if (initialLogs.length > 0) break;
            }

            const formattedData = initialLogs.map(formatLogForChart).reverse();
            setChartData(formattedData);

            if (initialLogs.length > 0) {
                setLatestLog(initialLogs[0]);
            }
        }
    }, [user, chartData.length]);

    useEffect(() => {
        if (deviceLogs.length > 0) {
            const newestPusherLog = deviceLogs[0];
            setLatestLog(newestPusherLog);

            const newChartEntry = formatLogForChart(newestPusherLog);
            setChartData(prevData => {
                const updatedData = [...prevData, newChartEntry];
                return updatedData.slice(-20);
            });
        }
    }, [deviceLogs]);

    if (isUserLoading) {
        return <LoadingSpinner text="Memuat data pengguna..." />;
    }
    if (userError) return <ErrorMessage text={userError} />;
    if (!user) return <ErrorMessage text="Tidak ada data pengguna." />;

    return (
        <PageContent>
            <h2 className="text-gray-800 font-bold text-lg mb-4 p-2">Cluster</h2>

            <div className="p-2 mb-8">
                <RealtimeStats latestLog={latestLog} />
            </div>

            {metrics ? (
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 mt-4">
                    <StatCard
                        icon={<FiBatteryCharging />}
                        label="Charging Current"
                        value={metrics.chargingCurrent}
                        unit="A"
                    />
                    <StatCard
                        icon={<FiBatteryCharging />}
                        label="Battery Voltage"
                        value={metrics.batteryVoltage}
                        unit="V"
                    />
                    <StatCard
                        icon={<GiElectric />}
                        label="Total Electricity"
                        value={metrics.totalElectricity}
                        unit="W"
                    />
                    <StatCard
                        icon={<GiElectric />}
                        label="Today Generation"
                        value={metrics.dayElectricity}
                        unit="kWh"
                    />
                </div>
            ) : (
                <></>
            )}

            <div className="mt-8">
                <PvPowerChart data={chartData} />
            </div>
        </PageContent>
    );
};