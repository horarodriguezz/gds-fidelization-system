import React from "react";
import { DataTable } from "../../../../components/DataTable";
import { Card } from "../../../../components/ui/card";

function Table() {
  return (
    <Card>
      <DataTable columns={[]} data={[]} />
    </Card>
  );
}

export default React.memo(Table);
