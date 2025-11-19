import type { ColumnDef } from "@tanstack/react-table";
import type { CustomerBusinessModel } from "../../../../../api/types/Models/CustomerBusinessModel";
import Name from "./Name";
import Contact from "./Contact";
import Points from "./Points";
import LastVisit from "./LastVisit";
import Buttons from "./Buttons";

export const columns: ColumnDef<CustomerBusinessModel>[] = [
  {
    accessorKey: "customer.id",
    header: "Cliente",
    cell: ({ row }) => <Name {...row.original.customer} />,
  },
  {
    accessorKey: "customer.phoneNumber",
    header: "Contacto",
    cell: ({ row }) => <Contact {...row.original.customer} />,
  },
  {
    accessorKey: "cachedPoints",
    header: "Puntos",
    cell: ({ row }) => <Points points={row.original.cachedPoints} />,
  },
  {
    accessorKey: "lastVisitedAt",
    header: "Última visita",
    cell: ({ row }) => <LastVisit {...row.original} />,
  },
  {
    accessorKey: "actions",
    header: () => (
      <span className='w-full flex items-center justify-end'>Acciones</span>
    ),
    cell: ({ row }) => <Buttons {...row.original.customer} />,
  },
];
