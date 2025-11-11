/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import type { CircleProgressProps, Marker } from '../../types/interface';
import {
    calculateAngle,
    calculateCoordinates,
    calculatePercentage,
    calculateLabelPosition,
    getCircleAngles,
    describeArc,
    sortMarkers
} from '../../utils/mathUtils';

const CircleProgress: React.FC<CircleProgressProps> = ({
    value,
    maxValue = 1000,
    size = 160,
    strokeWidth = 15,
    batteryPercentage,
    showMarkers = true,
    showMarkerLabels = true,
    markerPosition = 'outside',
    customMarkers = [0, 250, 500, 750, 1000],
    circleType = 'semi',
    startAngle,
    endAngle,
    maxFillAngle,
}) => {
    const center = size / 2;
    const radius = center - strokeWidth;

    const circleAngles = startAngle !== undefined && endAngle !== undefined
        ? { startAngle, endAngle }
        : getCircleAngles(circleType);

    const { startAngle: circleStart, endAngle: circleEnd } = circleAngles;

    const effectiveEndAngle = maxFillAngle !== undefined ? maxFillAngle : circleEnd;

    // const totalAngle = circleEnd - circleStart;

    const sortedMarkers = sortMarkers(customMarkers);

    const clampedValue = Math.min(Math.max(value, 0), maxValue);
    const progressPercentage = calculatePercentage(clampedValue, maxValue);

    const progressAngle = calculateAngle(clampedValue, maxValue, circleStart, effectiveEndAngle);

    // const batteryProgressPercentage = batteryPercentage !== undefined ?
        // calculatePercentage(batteryPercentage, 100) : progressPercentage;

    const generateMarkers = (): Marker[] => {
        return sortedMarkers.map(markerValue => {
            const angle = calculateAngle(markerValue, maxValue, circleStart, circleEnd);
            const markerRadius = markerPosition === 'inside'
                ? radius - strokeWidth / 2 - 5
                : radius + strokeWidth / 2 + 5;

            const position = calculateCoordinates(angle, markerRadius, center);
            const labelPosition = calculateLabelPosition(
                angle,
                radius,
                center,
                markerPosition === 'outside' ? 25 : 0
            );

            return {
                value: markerValue,
                angle,
                position,
                labelPosition,
            };
        });
    };

    const markers = generateMarkers();

    const getProgressColor = (): string => {
        if (batteryPercentage !== undefined) {
            if (batteryPercentage <= 20) return '#ef4444';
            if (batteryPercentage <= 50) return '#f59e0b';
            return '#10b981';
        }

        if (progressPercentage <= 25) return '#ef4444';
        if (progressPercentage <= 50) return '#f59e0b';
        if (progressPercentage <= 75) return '#3b82f6';
        return '#10b981';
    };

    const progressColor = getProgressColor();

    const getTextAlignment = (angle: number): string => {
        if (angle <= 45 || angle >= 315) return 'text-center';
        if (angle > 45 && angle < 135) return 'text-left';
        if (angle >= 135 && angle <= 225) return 'text-center';
        return 'text-right';
    };

    const backgroundArc = describeArc(center, center, radius, circleStart, circleEnd);
    const progressArc = describeArc(center, center, radius, circleStart, progressAngle);

    const getCenterTextPosition = () => {
        switch (circleType) {
            case 'semi':
                return { top: '70%' };
            case 'three-quarter':
                return { top: '65%' };
            case 'full':
            default:
                return { top: '50%' };
        }
    };

    return (
        <div className="relative flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="transform -rotate-90">
                    <path
                        d={backgroundArc}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                    />

                    <path
                        d={progressArc}
                        fill="none"
                        stroke={progressColor}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                    />
                </svg>

                {showMarkers && markers.map((marker, index) => (
                    <React.Fragment key={index}>
                        <div
                            className={`absolute rounded-full ${markerPosition === 'inside'
                                ? 'w-2 h-2 bg-gray-400'
                                : 'w-2 h-2 bg-gray-600'
                                } transform -translate-x-1/2 -translate-y-1/2`}
                            style={{
                                left: marker.position.x,
                                top: marker.position.y,
                            }}
                        />

                        {showMarkerLabels && markerPosition === 'outside' && (
                            <div
                                className={`absolute text-[10px] font-medium text-gray-300 ${getTextAlignment(marker.angle)}`}
                                style={{
                                    left: marker.labelPosition.x,
                                    top: marker.labelPosition.y,
                                    transform: 'translate(-50%, -50%)',
                                    minWidth: '40px',
                                    textAlign: 'center' as const,
                                }}
                            >
                                {marker.value}
                            </div>
                        )}
                    </React.Fragment>
                ))}

                <div
                    className="absolute flex flex-col items-center justify-center"
                    style={{
                        left: '50%',
                        ...getCenterTextPosition(),
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                    }}
                >
                    {batteryPercentage !== undefined ? (
                        <>
                            <div className="text-2xl font-bold text-gray-800">
                                {batteryPercentage}%
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                Battery
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                {value}/{maxValue}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-2xl font-bold text-gray-800">
                                {value}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                                {/* {progressPercentage.toFixed(1)}% */}
                                W
                            </div>
                            {maxFillAngle !== undefined && (
                                <div className="text-xs text-orange-500 mt-1">
                                    Max angle: {maxFillAngle}°
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Debug info */}
            {/* <div className="mt-2 text-xs text-gray-500">
                Value: {value} | Progress: {progressPercentage.toFixed(1)}% |
                {maxFillAngle !== undefined && `Max Fill Angle: ${maxFillAngle}° |`}
                Angle: {progressAngle.toFixed(1)}° | Range: {circleStart}°-{circleEnd}°
            </div> */}
        </div>
    );
};

export default CircleProgress;