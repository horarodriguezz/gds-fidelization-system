import React from "react";
import { DataTable } from "../../../../../components/DataTable";
import { Card } from "../../../../../components/ui/card";
import { useStore } from "@nanostores/react";
import {
  $customers,
  $customersPagination,
} from "../../../../../store/business/customer";
import { columns } from "./tableColumns";
import type { PaginationState } from "@tanstack/react-table";

function Table() {
  const customers = useStore($customers);
  const pagination = useStore($customersPagination);

  const handlePaginationChange = (newPagination: PaginationState) => {
    const { pageIndex, pageSize } = newPagination;

    $customersPagination.setKey("currentPage", pageIndex + 1);
    $customersPagination.setKey("perPage", pageSize);
  };

  return (
    <Card className='p-2 grow overflow-hidden'>
      <DataTable
        columns={columns}
        data={customers}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </Card>
  );
}

export default React.memo(Table);
