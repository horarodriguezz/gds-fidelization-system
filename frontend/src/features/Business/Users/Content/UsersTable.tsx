import React from "react";
import { DataTable } from "../../../../components/DataTable";
import type { ContentProps } from "../types";
import { columns } from "./tableColumns";

function UsersTable(props: ContentProps) {
  const { data } = props;

  return <DataTable data={data} columns={columns} />;
}

export default React.memo(UsersTable);
