// 通过创建测试组件的方式：创建一个测试组件，在这个测试组件内部使用这个 Hook（最差的方式）
import { render, fireEvent, screen } from '@testing-library/react';
import useCounter from './useCounter';
test('useCounter', () => {
    // 创建一个测试组件，使用 useCounter 的所有逻辑 
    const WrapperComponent = () => {
    const { count, increment, decrement } = useCounter();
    return (
        <>
            <button id="btnMinus" onClick={decrement}>-</button>
            <span id="result">{count}</span>
            <button id="btnAdd" onClick={increment}>+</button>
        </>);
    };
    // 渲染这个测试组件 
    render(<WrapperComponent />);
    // 找到页面的三个 DOM 元素用于执行操作以及验证结果
    const btnAdd = document.querySelector('#btnAdd'); 
    const btnMinus = document.querySelector('#btnMinus'); 
    const result = document.querySelector('#result');
    // 模拟点击加一按钮 
    fireEvent.click(btnAdd);
    // 验证结果是不是 1 
    expect(result).toHaveTextContent('1'); 
    // 模拟点击减一按钮 
    fireEvent.click(btnMinus);
    // 验证结果是不是 0 
    expect(result).toHaveTextContent('0');
});
