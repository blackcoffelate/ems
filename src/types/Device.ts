import type { DeviceLog } from "./DeviceLog";

interface SimpleCluster {
  id: number;
  name: string;
}

export interface Device {
  clusters: SimpleCluster[];

  id: number;
  imei: string;
  name: string;
  description: string;
  logs: DeviceLog[];
}
