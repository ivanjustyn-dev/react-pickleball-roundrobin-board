import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';


// Define the type for the returned value of the hook
type UseSessionStorageResult<T> = [T, Dispatch<SetStateAction<T>>];

/**
 * Custom hook to manage state that persists in sessionStorage and clears when the tab is closed.
 * @param {string} key The key under which the value is stored in sessionStorage.
 * @param {T} initialValue The initial value to use if nothing is in sessionStorage.
 * @returns {[T, Dispatch<SetStateAction<T>>]} A stateful value, and a function to update it.
 */
function useSessionStorage<T>(key: string, initialValue: T): UseSessionStorageResult<T> {
    // State to store our value
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            // Get from session storage by key
            const item = window.sessionStorage.getItem(key);
            // Parse stored JSON or if none, return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error, return initialValue
            console.error(`Error reading sessionStorage key “${key}”:`, error);
            return initialValue;
        }
    });

    // useEffect to update session storage when the state changes
    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        try {
            // Convert the value to a string (JSON format)
            const valueToStore = JSON.stringify(storedValue);
            // Save state to Session Storage
            window.sessionStorage.setItem(key, valueToStore);
        } catch (error) {
            console.error(`Error writing sessionStorage key “${key}”:`, error);
        }
    }, [key, storedValue]); // Dependency array ensures the effect runs only when key or storedValue changes

    return [storedValue, setStoredValue];
}

export default useSessionStorage;