import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import type { ContentProps } from "../types";
import Stats from "./Stats";
import UsersTable from "./UsersTable";

function Content(props: ContentProps) {
  const { data } = props;

  return (
    <main className='container mx-auto px-4 sm:px-6 py-6 sm:py-8 grow overflow-hidden flex flex-col'>
      <Stats data={data} />

      <Card className='py-0'>
        <UsersTable data={data} />
      </Card>
    </main>
  );
}

export default React.memo(Content);
