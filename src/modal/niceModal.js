import { useCallback, useMemo, useRef } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";

const modalCallbacks = {};
export const modalReducer = (state = { hiding: {} }, action) => {
    switch (action.type) {
        // 展示
        case "nice-modal/show":
            return {
                ...state,
                // 如果存在 modalId 对应的状态，就显示这个对话框
                [action.payload.modalId]: action.payload.args || true,  // 当前Id展示
                // 定义一个 hiding 状态用于处理对话框关闭动画
                hiding: {
                    ...state.hiding,
                    [action.payload.modalId]: false,
                },
            };
        // 隐藏
        case "nice-modal/hide":
            // 只有 force 时才真正移除对话框
            return action.payload.force
                ? {
                    ...state,
                    [action.payload.modalId]: false,    // 当前Id隐藏
                    hiding: {
                        [action.payload.modalId]: false 
                    },
                } : { 
                    ...state, 
                    hiding: { 
                        [action.payload.modalId]: true 
                    } 
                };
        default:
            return state;
    }
};

// 使用 action creator 来创建显示和隐藏对话框的 action
function showModal(modalId, args) {
    return {
        type: "nice-modal/show",
        payload: {
            modalId,
            args,
        },
    };
}

function hideModal(modalId, force) {
    return {
        type: "nice-modal/hide",
        payload: {
            modalId,
            force,
        },
    };
}
// 创建自定义 Hook 用于处理对话框逻辑
// 使用一个 object 缓存 promise 的 resolve 回调函数
export const useNiceModal = (modalId) => {
    const dispatch = useDispatch();
    // 封装 Redux action 用于显示对话框
    const show = useCallback(
        (args) => {
            // 显示对话框时，返回 promise 并且将 resolve 方法临时存起来
            return new Promise((resolve) => {
                modalCallbacks[modalId] = resolve;
                dispatch(showModal(modalId, args));
            });
        },
        [dispatch, modalId],
    );
    const resolve = useCallback(
        (args) => {
            if (modalCallbacks[modalId]) {
                // 如果存在 resolve 回调函数，那么就调用
                modalCallbacks[modalId](args);
                // 确保只能 resolve 一次
                delete modalCallbacks[modalId];
            }
        },
        [modalId],
    );
    // 封装 Redux action 用于隐藏对话框
    const hide = useCallback(
        (force) => {
            dispatch(hideModal(modalId, force));
            delete modalCallbacks[modalId];
        },
        [dispatch, modalId],
    );

    const args = useSelector((s) => s[modalId]);
    const hiding = useSelector((s) => s.hiding[modalId]);
    // 只要有参数就认为对话框应该显示，如果没有传递 args，在reducer 中会使用,默认值 true
    // 将 resolve 也作为返回值的一部分
    return useMemo(
        () => ({ args, hiding, visible: !!args, show, hide, resolve }),
        [args, hide, show, resolve, hiding],
    );
};

function NiceModal({ id, children, ...rest }) {
    const modal = useNiceModal(id);
    return (
        <Modal
            onCancel={() => modal.hide()}
            onOk={() => modal.hide()}
            afterClose={() => modal.hide(true)}
            visible={!modal.hiding}
            {...rest}
        >
            {children}
        </Modal>
    );
}

export const createNiceModal = (modalId, Comp) => {
    return (props) => {
        const { visible, args } = useNiceModal(modalId);
        if (!visible) return null;
        return <Comp {...args} {...props} />;
    };
};

NiceModal.create = createNiceModal;
NiceModal.useModal = useNiceModal;

export default NiceModal;
