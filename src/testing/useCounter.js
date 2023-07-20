import { useState, useCallback } from 'react';
export default function useCounter() {
    const [count, setCount] = useState(0);
    const increment = useCallback(() => setCount(c => c + 1), []);
    const decrement = useCallback(() => setCount(c => c - 1), []);
    return { count, increment, decrement };
}