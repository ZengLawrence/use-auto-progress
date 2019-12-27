import { useState, useEffect } from "react";

const PROGRESS_VALUES = [0, 25, 75, 90];
const INITIAL_VALUE = PROGRESS_VALUES[0];
const FINAL_VALUE = 100;

const useValueState = () => {
    const [value, setValue] = useState(INITIAL_VALUE);

    const finalValue = () => (setValue(FINAL_VALUE));
    return { value, setValue, finalValue };
}

const useAutoProgress = (start: boolean): [number, (start: boolean) => void] => {
    const { value, setValue, finalValue } = useValueState();
    const [startProgress, setStartProgress] = useState(start);
    const [timers, setTimers] = useState<NodeJS.Timeout[]>([]);

    const setValueTimer = (val: number, ms: number) => {
        return setTimeout(() => {
            setValue(val);
        }, ms);
    }
    const setStart = (s: boolean) => {
        if (s !== startProgress) {
            setStartProgress(s);
            if (s) {
                const setValueTimers = PROGRESS_VALUES.map((v, i) => setValueTimer(v, 500 * i));
                setTimers(setValueTimers);
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