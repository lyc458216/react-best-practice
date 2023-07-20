import { render, act } from '@testing-library/react';
import useCounter from './useCounter';
// 从这段代码可以看到，我们把 Hook 的返回值暴露到了函数组件之外，这样就可以直接对 Hook 进行操作了。
// 我们使用了 act 这样一个函数来封装对 Hook 返回值的方法调用。
// 这个其实是 React 提供的一个测试用的函数，用于模拟一个真实的 React 组件的执行步骤， 
// 从而保证在 act 的回调函数执行完成后，还会等 React 组件的生命周期都执行完毕，比如 useEffect，这样才能在随后对组件的渲染结果进行验证。
test('useCounter', () => {
    const hookResult = {};
    // 创建一个测试组件，仅运行 Hook，不产生任何 UI
    const WrapperComponent = () => {
        // 将 useCounter 的返回值复制给外部的 hookResult 对象
        Object.assign(hookResult, useCounter());
        return null;
    };
    // 渲染测试组件
    render(<WrapperComponent />);
    
    // 调用 hook 的 increment 方法
    act(() => {
        hookResult.increment();
    });
    // 验证结果为 1
    expect(hookResult.count).toBe(1);
    // 调用 hook 的 decrement 方法
    act(() => {
        hookResult.decrement();      
    });
    // 验证结果为 0
    expect(hookResult.count).toBe(0);
});