import { useCallback, useState } from 'react';

export const useLocalStorage = (key, defaultValue = '') => {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            // If error also return initialValue
            console.error(error);
            return defaultValue;
        }
    });

    // Return a wrapped version of useState's setter function
    // that persists the new value to localStorage.
    const setValue = useCallback(
        (value) => {
            try {
                // Allow value to be a function so we have same API as useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                // Save state
                setStoredValue(valueToStore);
                // Save to local storage
                localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(error);
            }
        },
        [setStoredValue],
    );

    return [storedValue, setValue];
};
