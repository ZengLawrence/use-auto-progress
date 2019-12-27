import { useState, useEffect } from "react";

const PROGRESS_VALUES = [0, 25, 75, 90];
const INITIAL_VALUE = PROGRESS_VALUES[0];
const FINAL_VALUE = 100;

const useValueState = () => {
    const [value, setValue] = useState(INITIAL_VALUE);

    const finalValue = () => (setValue(FINAL_VALUE));

    const setValueTimer = (val: number, ms: number) => {
        return setTimeout(() => {
            setValue(val);
        }, ms);
    }
    const scheduleTimers = (ms: number) => PROGRESS_VALUES.map((v, i) => setValueTimer(v, ms * i));
    return { value, finalValue, scheduleTimers };
}

const useAutoProgress = (start: boolean, options: {intervalMs: number} = {intervalMs: 500}): [number, (start: boolean) => void] => {
    const { value, finalValue, scheduleTimers } = useValueState();
    const [startProgress, setStartProgress] = useState(start);
    const [timers, setTimers] = useState<NodeJS.Timeout[]>([]);

    const setStart = (s: boolean) => {
        if (s !== startProgress) {
            setStartProgress(s);
            if (s) {
                setTimers(scheduleTimers(options.intervalMs));
            } else {
                finalValue();
            }
        }
    }

    useEffect(() => {
        return function cleanUp() {
            timers.forEach(timeout => clearTimeout(timeout));
        }
    }, [timers]);

    return [value, setStart];
}

export default useAutoProgress;