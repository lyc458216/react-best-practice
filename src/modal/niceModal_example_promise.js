import { useMemo, useState } from "react";
import _ from "lodash";
import { Button, Table } from "antd";
import { useNiceModal } from "./niceModal";
const data = [
    {
        id: "1",
        name: "Kennedy",
        job: "Chief Mobility Orchestrator",
        city: "North Alec",
    },
    {
        id: "2",
        name: "Lucius",
        job: "Internal Research Manager",
        city: "Littleland",
    },
    {
        id: "3",
        name: "Carlos",
        job: "Lead Configuration Analyst",
        city: "South Lillian",
    },
    {
        id: "4",
        name: "Urban",
        job: "Chief Operations Agent",
        city: "Shieldshaven",
    }
]

export default () => {
    const { show: showModal } = useNiceModal("user-info-modal");
    const [users, setUsers] = useState(data);
    const columns = useMemo(() => {
        return [
            {
                title: "Name",
                dataIndex: "name",
            },
            {
                title: "Job Title",
                dataIndex: "job",
            },
            {
                title: "Actions",
                render(value, user) {
                    return (
                        <Button
                            type="link"
                            onClick={() => {
                                showModal({ user }).then((newUser) => {
                                    setUsers((users) => {
                                        // Modify users immutablly
                                        const byId = _.keyBy(users, "id");
                                        byId[newUser.id] = newUser;
                                        return _.values(byId);
                                    });
                                });
                            }}
                        />
                    );
                },
            },
        ];
    }, [showModal]);

    return (
        <Table
            size="small"
            pagination={false}
            columns={columns}
            dataSource={users}
        />
    );
};
