//  React 应用测试
// 引入 testing-library 提供的相关工具
import { render, screen } from '@testing-library/react';
// 引入要测试的组件
import App from './App';

// 创建一个测试用例
test('renders learn react link', () => {
    // 使用 render 方法渲染 App 组件
    render(<App />);
     // 通过 screen 提供的 getByText 找到页面上的 DOM 元素
    const linkElement = screen.getByText(/learn react/i);
     // 断言这个元素应该在页面上
    expect(linkElement).toBeInTheDocument(); 
});

/**
 * 这里用到了 Testing Library 提供的三个 React 相关的测试 API:
 * 1. render:用于在内存中 render 一个 React 组件。
 * 2. screen:提供了工具方法，用于获取屏幕上的元素。比如这里的 screen.getByText，就 是用来根据文本获取 DOM 元素的。
 * 3. expect扩展:Testing Library 扩展了 expect 的功能，以方便对 UI 元素进行断言判断。比如例子中的 toBeInTheDocument ，就是用于断言 DOM 元素需要存在于 Document 中。
*/