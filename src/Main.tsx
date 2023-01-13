import { useState } from "react";
import { Table, Input, App, TableProps } from "antd";
import { faker } from "@faker-js/faker";
import spacetime from "spacetime";
// import {} "react-syntax"

interface Stamp {
    uuid: string;
    created: string;
    updated: string;
}

interface DataType extends Partial<Stamp> {
    name: string;
    description: string;
    wokeUpAt: number | Date | string;
    sleptBy: number | Date | string;
}

interface RenderTableProps extends TableProps<DataType> {}

const getData = (
    params?:
        | {
              length: number;
              showNewRow?: boolean;
          }
        | undefined
): RenderTableProps["dataSource"] => {
    const { length = 6, showNewRow = false } = { ...params };

    const { name, system, date } = faker;

    const dataSource: RenderTableProps["dataSource"] = Array.from(
        Array(length + (showNewRow ? 1 : 0)),
        (v, i) =>
            i === length
                ? {
                  // TODO: Render controls
                      name: "Enter Name",
                      description: "Enter desc",
                      wokeUpAt: spacetime
                          .today()
                          .add(7, "hour")
                          .format("datetime"),
                      sleptBy: spacetime
                          .today()
                          .add(23, "hour")
                          .format("datetime"),
                  }
                : {
                      name: name.fullName(),
                      description: `${system.networkInterface()}`,
                      wokeUpAt: spacetime
                          .today()
                          .add(7, "hour")
                          .format("datetime"),
                      sleptBy: spacetime
                          .today()
                          .add(23, "hour")
                          .format("datetime"),
                  }
    );

    return dataSource;
};

const getColumns = (
    params?:
        | {
              showNewColumn?: boolean;
          }
        | undefined
): RenderTableProps["columns"] => {
    const { showNewColumn = false } = { ...params };

    const columns: RenderTableProps["columns"] = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (v) => v,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            render: (v) => v,
        },
        {
            title: "Woke Up At",
            dataIndex: "wokeUpAt",
            key: "wokeUpAt",
            render: (v) => v,
        },
        {
            title: "Slept By",
            dataIndex: "sleptBy",
            key: "sleptBy",
            render: (v) => v,
        },
    ];
    return columns;
};

const Main = () => {
    const [showNewRow, setShowNewRow] = useState<boolean>(true);
    const [showNewColumn, setShowNewColumn] = useState<boolean>(true);

    const dataSource = getData({ length: 8, showNewRow });

    const columns = getColumns({ showNewColumn });

    const tableProps: RenderTableProps = {
        dataSource,
        columns,
        pagination: false,
        size: "large",
    };

    return (
        <App>
            <Input.TextArea
                rows={12}
                value={JSON.stringify(dataSource, undefined, 4)}
            />
            <Table {...tableProps} />
        </App>
    );
};

export default Main;
