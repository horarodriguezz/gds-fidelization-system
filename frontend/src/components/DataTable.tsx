"use client";

import type {
  ColumnDef,
  PaginationState,
  Updater,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaginationMetadata } from "../api/types/Paginated";
import { DataTablePagination } from "./DataTablePagination";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationMetadata;
  onPaginationChange?: (pageState: PaginationState) => void;
}

function adapter(p: PaginationMetadata): PaginationState {
  return {
    pageIndex: p.currentPage - 1,
    pageSize: p.perPage,
  };
}

const DEFAULT_PAGINATION = {
  pageIndex: 0,
  pageSize: 10,
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  onPaginationChange,
}: DataTableProps<TData, TValue>) {
  const handlePageChange = (updater: Updater<PaginationState>) => {
    if (onPaginationChange) {
      const newState =
        typeof updater === "function" ? updater(adapter(pagination!)) : updater;

      onPaginationChange(newState);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    rowCount: pagination?.total,
    manualPagination: !!pagination,
    state: pagination
      ? {
          pagination: adapter(pagination),
        }
      : undefined,
    onPaginationChange: handlePageChange,
  });

  return (
    <div className='flex flex-col space-y-2'>
      <div className='overflow-hidden rounded-md border w-full h-full'>
        <Table className='w-full h-full'>
          <TableHeader className='border-b border-border bg-muted/50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className='text-left p-4 font-semibold text-sm text-muted-foreground whitespace-nowrap'
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='border-b border-border hover:bg-muted/50'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className='p-4 whitespace-nowrap' key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='text-center p-8 text-muted-foreground'
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
