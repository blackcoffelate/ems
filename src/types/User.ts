import type { Cluster } from "./Cluster";

interface UserMeta {
  address: string;
  phone: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  meta: UserMeta;
  clusters: Cluster[];
}
