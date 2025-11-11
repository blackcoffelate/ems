export interface CircleProgressProps {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  batteryPercentage?: number;
  showMarkers?: boolean;
  showMarkerLabels?: boolean;
  markerPosition?: "inside" | "outside";
  customMarkers?: number[];
  circleType?: "full" | "semi" | "three-quarter";
  startAngle?: number;
  endAngle?: number;
  maxFillAngle?: number;
}

export interface Marker {
  value: number;
  angle: number;
  position: { x: number; y: number };
  labelPosition: { x: number; y: number };
}
