import type { Device } from "./Device";

export interface Cluster {
  id: number;
  name: string;
  description: string;
  devices: Device[];
}
