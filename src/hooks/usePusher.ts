/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import type { DeviceLog } from "../types/DeviceLog";

const APP_KEY = "exvdh1s4c55cbvdxl5np";
const CHANNEL_NAME = "private-App.Models.User.3";
const EVENT_NAME = "device.log.created";

export const usePusher = () => {
  const [deviceLogs, setDeviceLogs] = useState<DeviceLog[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("Pusher: Auth token not found.");
      return;
    }

    const pusher = new Pusher(APP_KEY, {
      wsHost: "ems.invix.id",
      wsPort: 443,
      forceTLS: true,
      enabledTransports: ["ws", "wss"],
      cluster: "",

      authEndpoint: "https://ems.invix.id/broadcasting/auth",
      auth: {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json",
        },
      },
    });

    pusher.connection.bind("connected", () => {
      console.log("Pusher connected successfully!");
      setIsConnected(true);
    });

    pusher.connection.bind("disconnected", () => {
      console.log("Pusher disconnected.");
      setIsConnected(false);
    });

    pusher.connection.bind("error", (err: any) => {
      console.error("Pusher connection error:", err);
      setIsConnected(false);
    });

    const channel = pusher.subscribe(CHANNEL_NAME);

    channel.bind(EVENT_NAME, (data: DeviceLog) => {
      console.log("Received new device log:", data);

      setDeviceLogs((prevLogs) => [data, ...prevLogs]);
    });

    return () => {
      console.log("Cleaning up Pusher connection...");
      pusher.unsubscribe(CHANNEL_NAME);
      pusher.disconnect();
    };
  }, []);

  return { deviceLogs, isConnected };
};
