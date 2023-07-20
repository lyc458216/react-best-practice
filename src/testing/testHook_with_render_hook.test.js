import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';
test('useCounter3', () => {
    // 使用 renderHook API 来调用一个 Hook
    const { result } = renderHook(() => useCounter());
    // Hook 的返回值会存储在 result.current 中
    // 调用加一方法
    act(() => {
        result.current.increment();
    });
    // 验证结果为 1
    expect(result.current.count).toBe(1);
    // 调用减一方法
    act(() => {
        result.current.decrement();
    });
    // 验证结果为 0
    expect(result.current.count).toBe(0);
});