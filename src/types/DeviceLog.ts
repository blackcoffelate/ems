export interface DeviceData {
  bat_type: string;
  bat_value: number;
  bat_number: number;
  mppt_fault: string[];
  error_value: number;
  mppt_status: string[];
  bat_capacity: number;
  machine_time: string;
  machine_type: string;
  mppt_warning: string[];
  pv_value_raw: number;
  bat_temp_value: number;
  mcu_temp_value: number;
  system_runtime: {
    days: number;
    hours: number;
  };
  day_electricity: number;
  load_percentage: number;
  software_version: string;
  total_electricity: number;
  heatsink_temp_value: number;
  charge_current_value: number;
}

export interface DeviceLog {
  id: string;
  imei: string;
  type: string;
  time: number;
  data: DeviceData;
  created_at: string;
}
