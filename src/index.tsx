import { useState, useEffect } from "react";

const PROGRESS_VALUES = [0, 25, 75, 90];
const INITIAL_VALUE = PROGRESS_VALUES[0];
const LAST_VALUE = PROGRESS_VALUES[PROGRESS_VALUES.length - 1];
const FINAL_VALUE = 100;

function findNext(n: number) {
    const nextVal = PROGRESS_VALUES.find(v => v > n);
    return (nextVal ? nextVal : LAST_VALUE);
}

const useValueState = (): [number, () => void, () => void, () => void] => {
    const [value, setValue] = useState(INITIAL_VALUE);

    const nextValue = () => (setValue(findNext(value)));
    const finalValue = () => (setValue(FINAL_VALUE));
    const resetValue = () => (setValue(INITIAL_VALUE));
    return [value, nextValue, finalValue, resetValue];
}

const useAutoProgressEffect = (start: boolean): [number, (start: boolean) => void] => {
    const [value, nextValue, finalValue, resetValue] = useValueState();
    const [startProgress, setStartProgress] = useState(start);

    const setStart = (s: boolean) => { 
        if (s !== startProgress) {
            setStartProgress(s);
            if (s) {
                resetValue();
            } else {
                finalValue(); 
            }
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (startProgress) {
                nextValue();
            }
        }, 200);

        return function cleanUp() {
            clearTimeout(timeout);
        }
    });

    return [value, setStart];
}

export default useAutoProgressEffect;