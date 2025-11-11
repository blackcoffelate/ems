import { useDeviceMetrics } from "../../hooks/useDeviceMetrics";
import type { DeviceLog } from "../../types/DeviceLog";
import CircleProgress from "./CircleProgress";
import CircleProgressPercent from "./CircleProgressPercent";
import { LoadingSpinner } from "./LoadingSpinner";

interface RealtimeStatsProps {
    latestLog: DeviceLog | null;
}

export const RealtimeStats: React.FC<RealtimeStatsProps> = ({ latestLog }) => {
    const metrics = useDeviceMetrics(latestLog);

    if (!metrics) {
        return <LoadingSpinner text="Menunggu data real-time..." />;
    }

    return (
        <div className='flex flex-1 items-center justify-between'>
            <div className='flex flex-col items-center justify-center'>
                <CircleProgress
                    value={metrics.pvPower}
                    maxValue={1000}
                    circleType="three-quarter"
                />
                <span className='text-xs font-bold'>PV POWER</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <CircleProgressPercent
                    value={metrics.loadPercentage}
                    maxValue={100}
                    circleType="three-quarter"
                />
                <span className='text-xs font-bold'>LOAD POWER</span>
            </div>
        </div>
    );
};