export const calculateAngle = (
  value: number,
  maxValue: number,
  startAngle: number = 0,
  endAngle: number = 360
): number => {
  const totalAngle = endAngle - startAngle;
  return startAngle + (value / maxValue) * totalAngle - 0;
};

export const calculateCoordinates = (
  angle: number,
  radius: number,
  center: number
): { x: number; y: number } => {
  const rad = ((angle - 195) * Math.PI) / 170;
  return {
    x: center + radius * Math.cos(rad),
    y: center + radius * Math.sin(rad),
  };
};

export const calculatePercentage = (
  value: number,
  maxValue: number
): number => {
  return (value / maxValue) * 100;
};

export const calculateLabelPosition = (
  angle: number,
  radius: number,
  center: number,
  offset: number = 10
): { x: number; y: number } => {
  const rad = ((angle - 195) * Math.PI) / 170;
  const labelRadius = radius + offset;
  return {
    x: center + labelRadius * Math.cos(rad),
    y: center + labelRadius * Math.sin(rad),
  };
};

export const getCircleAngles = (
  circleType: "full" | "semi" | "three-quarter" = "full"
): { startAngle: number; endAngle: number } => {
  switch (circleType) {
    case "semi":
      return { startAngle: 180, endAngle: 360 };
    case "three-quarter":
      return { startAngle: 310, endAngle: 590 };
    case "full":
    default:
      return { startAngle: 0, endAngle: 360 };
  }
};

export const describeArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

export const sortMarkers = (markers: number[]): number[] => {
  return [...markers].sort((a, b) => a - b);
};
