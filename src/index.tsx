import { useState, useEffect } from "react";

const DEFAULT_STEPS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const INITIAL_VALUE = 0;
const FINAL_VALUE = 100;
const DEFAULT_INTERVAL_MS = 500;

const useValueState = (steps: number[]) => {
    const interimSteps = steps.filter(n => n!==FINAL_VALUE);
    const [value, setValue] = useState(INITIAL_VALUE);

    const finalValue = () => (setValue(FINAL_VALUE));

    const setValueTimer = (val: number, ms: number) => {
        return setTimeout(() => {
            setValue(val);
        }, ms);
    }
    const scheduleTimers = (ms: number) => interimSteps.map((v, i) => setValueTimer(v, ms * i));
    return { value, finalValue, scheduleTimers };
}

const useAutoProgress = (start: boolean, options: { intervalMs?: number, steps?: number[] } = {}): [number, (start: boolean) => void, boolean] => {
    const { intervalMs, steps } = { intervalMs: DEFAULT_INTERVAL_MS, steps: DEFAULT_STEPS, ...options };
    const { value, finalValue, scheduleTimers } = useValueState(steps);
    const [running, setRunning] = useState(start);

    const [timers, setTimers] = useState<NodeJS.Timeout[]>([]);
    const cancelTimers = () => timers.forEach(timeout => clearTimeout(timeout));

    const setStart = (s: boolean) => {
        if (s !== running) {
            setRunning(s);
            if (s) {
                setTimers(scheduleTimers(intervalMs));
            } else {
                cancelTimers();
                finalValue();
            }
        }
    }

    useEffect(() => {
        return function cleanUp() {
            cancelTimers();
        }
    }, [timers]);

    return [value, setStart, running];
}

export default useAutoProgress;