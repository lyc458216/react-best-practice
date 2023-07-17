import React, { useCallback, useMemo } from "react";
import { useSearchParam } from "react-use";
// 状态最小化原则，避免冗余的状态
// 唯一数据源原则，避免中间态
function SearchBox({ data }) {
    const searchKey = useSearchParam("key") || "";
    const filtered = useMemo(() => {
        return data.filter((item) =>
            item.title.toLowerCase().includes(searchKey.toLowerCase())
        );
    }, [searchKey, data]);

    const handleSearch = useCallback((evt) => {
        window.history.pushState(
            {},
            "",
            `${window.location.pathname}?key=${evt.target.value}`
        );
    }, []);
    return (
        <div className="08-filter-list">
            <h2>Movies (Search key in URL)</h2>
            <input
                value={searchKey}
                placeholder="Search..."
                onChange={handleSearch}
            />
            <ul style={{ marginTop: 20 }}>
                {filtered.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default () => {
    const data = [
        {
            id: 1,
            title: "Mein Kampf"
        },
        {
            id: 2,
            title: "Tumannost Andromedy"
        },
        {
            id: 3,
            title: "Terumae romae (Thermae Romae)"
        },
        {
            id: 4,
            title: "White Banners"
        },
        {
            id: 5,
            title: "Train, The"
        }
    ];
    return <SearchBox data={data} />;
};
