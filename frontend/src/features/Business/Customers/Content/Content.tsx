import React from "react";
import Stats from "./Stats";
import CustomerFilters from "./CustomerFilters";

function Content() {
  return (
    <main className='container mx-auto px-4 sm:px-6 py-6 sm:py-8'>
      <Stats />

      <CustomerFilters />
    </main>
  );
}

export default React.memo(Content);
