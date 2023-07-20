/**
 * 资源的分包，用于实现按需加载的功能。利用了 import 语句 和 Webpack 对分包的支持，这样就能够实现按需加载，从而提高首屏页面的打开速度
*/
// 按需加载
import Loadable from "react-loadable";  // 模块加载器

// 创建一个显示加载状态的组件
function Loading({ error }) {
    return error ? 'Failed' : 'Loading';
}

// 创建加载器组件
export default Loadable({
    loader: () => import("./HelloLazyLoad"),
    loading: Loading,
});
