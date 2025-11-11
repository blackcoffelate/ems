import { useMemo } from "react";
import type { DeviceLog } from "../types/DeviceLog";

export const useDeviceMetrics = (log: DeviceLog | null) => {
  const metrics = useMemo(() => {
    if (!log) {
      return null;
    }

    const pvPower = log.data.charge_current_value * log.data.pv_value_raw;

    const batteryPercentage = log.data.bat_capacity;
    const batteryVoltage = log.data.bat_value;

    const loadPercentage = log.data.load_percentage;
    const dayElectricity = log.data.day_electricity;
    const totalElectricity = log.data.total_electricity;
    const chargingCurrent = log.data.charge_current_value;

    return {
      pvPower,
      batteryPercentage,
      batteryVoltage,
      loadPercentage,
      dayElectricity,
      totalElectricity,
      chargingCurrent,
    };
  }, [log]);

  return metrics;
};
