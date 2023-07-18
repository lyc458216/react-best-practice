import { useState, useMemo, useCallback } from "react";
// Form 最为核心的机制就是将表单元素的所有状态提取出来
// 这样表单就可以分为状态逻辑和 UI 展现逻辑
// 从而实现数据层和表现层的分离
const useForm = (initialValues = {}, validators) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const setFieldValue = useCallback(
        (name, value) => {
            setValues((values) => ({
                ...values,
                [name]: value,
            }));

            if (validators[name]) {
                const errMsg = validators[name](value);
                setErrors((errors) => ({
                    ...errors,
                    [name]: errMsg || null,
                }));
            }
        },
        [validators],
    );

    return { values, errors, setFieldValue };
};

export default () => {
    const validators = useMemo(() => {
        return {
            name: (value) => {
                if (value.length < 2) return "Name length should be no less than 2.";
                return null;
            },
            email: (value) => {
                if (!value.includes("@")) return "Invalid email address";
                return null;
            },
        };
    }, []);
    const { values, errors, setFieldValue } = useForm({}, validators);
    const handleSubmit = useCallback(
        (evt) => {
            evt.preventDefault();
            console.log(values);
        },
        [values],
    );
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input
                    value={values.name || null}
                    onChange={(evt) => setFieldValue("name", evt.target.value)}
                />
                {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
            </div>

            <div>
                <label>Email:</label>
                <input
                    value={values.email || null}
                    onChange={(evt) => setFieldValue("email", evt.target.value)}
                />
                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};
