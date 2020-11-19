import { useEffect, useState } from "react";

export const NUMBER_OF_SECONDS_IN_A_DAY = 86400;
const HOURS_IN_A_DAY = 24;
const MINUTES_IN_A_HOUR = 60;

export const useTimer = () => {
    const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTime]);

    return currentTime;
};

export function getDaysRemaining(
    endUnixTimestamp: number,
    startUnixTimestamp: number
): number {
    if (!endUnixTimestamp || !startUnixTimestamp) return 0;
    if (startUnixTimestamp > endUnixTimestamp) return 0;
    const remainingTicks = endUnixTimestamp - startUnixTimestamp;
    return Math.floor(remainingTicks / NUMBER_OF_SECONDS_IN_A_DAY);
}

function getHoursRemaining(
    endUnixTimestamp: number,
    startUnixTimestamp: number
): number {
    if (!endUnixTimestamp || !startUnixTimestamp) return 0;
    if (startUnixTimestamp > endUnixTimestamp) return 0;
    const remainingTicks = endUnixTimestamp - startUnixTimestamp;
    return Math.floor(
        (remainingTicks / NUMBER_OF_SECONDS_IN_A_DAY) * HOURS_IN_A_DAY
    );
}

function getMinutesRemaining(
    endUnixTimestamp: number,
    startUnixTimestamp: number
): number {
    if (!endUnixTimestamp || !startUnixTimestamp) return 0;
    if (startUnixTimestamp > endUnixTimestamp) return 0;
    const remainingTicks = endUnixTimestamp - startUnixTimestamp;
    return Math.floor(
        (remainingTicks / NUMBER_OF_SECONDS_IN_A_DAY) *
        HOURS_IN_A_DAY *
        MINUTES_IN_A_HOUR
    );
}

function getSecondsRemaining(
    endUnixTimestamp: number,
    startUnixTimestamp: number
): number {
    if (!endUnixTimestamp || !startUnixTimestamp) return 0;
    if (startUnixTimestamp > endUnixTimestamp) return 0;
    const remainingTicks = endUnixTimestamp - startUnixTimestamp;
    // use MINUTES_IN_A_HOUR 2 times since there are also 60 seconds in a minute
    return Math.floor(
        (remainingTicks / NUMBER_OF_SECONDS_IN_A_DAY) *
        HOURS_IN_A_DAY *
        MINUTES_IN_A_HOUR *
        MINUTES_IN_A_HOUR
    );
}

export function getHoursMinusDaysRemaining(
    endUnixTimestamp: number,
    startUnixTimestamp: number
): number {
    const getDays = getDaysRemaining(endUnixTimestamp, startUnixTimestamp);
    const hours = getDays * 24;
    return getHoursRemaining(endUnixTimestamp, startUnixTimestamp) - hours;
}

export function getMinutesMinusHoursRemaining(
    endUnixTimestamp: number,
    startUnixTimestamp: number
): number {
    const getHours = getHoursRemaining(endUnixTimestamp, startUnixTimestamp);
    const hours = getHours * 60;
    return getMinutesRemaining(endUnixTimestamp, startUnixTimestamp) - hours;
}

export function getSecondsMinusMinutesRemaining(
    endUnixTimestamp: number,
    startUnixTimestamp: number
): number {
    const getMinutes = getMinutesRemaining(endUnixTimestamp, startUnixTimestamp);
    const minutes = getMinutes * 60;
    return getSecondsRemaining(endUnixTimestamp, startUnixTimestamp) - minutes;
}