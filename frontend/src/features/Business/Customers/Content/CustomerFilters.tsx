import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Search } from "lucide-react";
import { Input } from "../../../../components/ui/input";

import {
  $customersPagination,
  $search,
} from "../../../../store/business/customer";
import { useStore } from "@nanostores/react";
import { useDebounceCallback } from "usehooks-ts";

function Fitlers() {
  const search = useStore($search);

  const handleSearchChange = useDebounceCallback((value: string) => {
    $search.set(value);
    $customersPagination.setKey("currentPage", 1);
  }, 500);

  return (
    <Card className='mb-6'>
      <CardContent className='px-3 sm:px-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Buscar por nombre, teléfono o email...'
              onChange={(e) => handleSearchChange(e.target.value)}
              className='pl-10'
              defaultValue={search}
            />
          </div>

          {/* Example filter by "Nivel" */}
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(Fitlers);
