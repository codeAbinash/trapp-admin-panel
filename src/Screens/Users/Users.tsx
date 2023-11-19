'use client'

import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DEFAULT_PP } from '@/constants'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Ban, Delete, Pencil, Trash2 } from 'lucide-react'

interface DataTablePaginationProps<TData> {
  table: TableType<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className='flex items-center justify-between px-2'>
      <div className='flex-1 text-sm text-muted-foreground'>
        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className='flex items-center space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button variant='outline' className='h-8 w-8 p-0' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button variant='outline' className='h-8 w-8 p-0' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

const data: User[] = [
  {
    id: 'm5gr84i9',
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    status: 'regular',
    profile_pic: null,
    subscription: 'expired',
  },
  {
    id: '3u1reuv4',
    status: 'banned',
    name: 'Ken Wheeler',
    email: 'Abe45@gmail.com',
    phone: '+91 9876543210',
    subscription: 'active',
  },
  {
    id: 'derv1ws0',
    status: 'regular',
    email: 'Monserrat44@gmail.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'trial',
  },
  {
    id: '5kma53ae',
    status: 'regular',
    name: 'Ken Wheeler',
    email: 'Silas22@gmail.com',
    phone: '+91 9876543210',
    subscription: 'active',
  },
  {
    id: 'bhqecj4p',
    status: 'regular',
    email: 'carmella@hotmail.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'expired',
  },
  {
    id: 'm5gr84i9',
    status: 'banned',
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'trial',
  },
  {
    id: 'm5gr84i9',
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    status: 'regular',
    profile_pic: null,
    subscription: 'expired',
  },
  {
    id: '3u1reuv4',
    status: 'banned',
    name: 'Ken Wheeler',
    email: 'Abe45@gmail.com',
    phone: '+91 9876543210',
    subscription: 'active',
  },
  {
    id: 'derv1ws0',
    status: 'regular',
    email: 'Monserrat44@gmail.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'trial',
  },
  {
    id: '5kma53ae',
    status: 'regular',
    name: 'Ken Wheeler',
    email: 'Silas22@gmail.com',
    phone: '+91 9876543210',
    subscription: 'active',
  },
  {
    id: 'bhqecj4p',
    status: 'regular',
    email: 'carmella@hotmail.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'expired',
  },
  {
    id: 'm5gr84i9',
    status: 'banned',
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'trial',
  },
  {
    id: 'm5gr84i9',
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    status: 'regular',
    profile_pic: null,
    subscription: 'expired',
  },
  {
    id: '3u1reuv4',
    status: 'banned',
    name: 'Ken Wheeler',
    email: 'Abe45@gmail.com',
    phone: '+91 9876543210',
    subscription: 'active',
  },
  {
    id: 'derv1ws0',
    status: 'regular',
    email: 'Monserrat44@gmail.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'trial',
  },
  {
    id: '5kma53ae',
    status: 'regular',
    name: 'Ken Wheeler',
    email: 'Silas22@gmail.com',
    phone: '+91 9876543210',
    subscription: 'active',
  },
  {
    id: 'bhqecj4p',
    status: 'regular',
    email: 'carmella@hotmail.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'expired',
  },
  {
    id: 'm5gr84i9',
    status: 'banned',
    email: 'ken99@yahoo.com',
    name: 'Ken Wheeler',
    phone: '+91 9876543210',
    subscription: 'trial',
  },
]

export type User = {
  name: string
  email?: string
  profile_pic?: string | null
  phone?: string
  created_at?: string
  id: string
  status: 'banned' | 'regular'
  subscription: 'expired' | 'active' | 'trial'
}

function getStatusColor(status: string) {
  switch (status) {
    case 'banned':
      return 'bg-red-500'
    case 'regular':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
}

function getSubscriptionColor(subscription: string) {
  switch (subscription) {
    case 'expired':
      return 'bg-gray-500'
    case 'active':
      return 'bg-green-500'
    default:
      return 'bg-orange-500'
  }
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'profile_pic',
    header: 'Profile Picture',
    cell: ({ row }) => <img src={row.getValue('profile_pic') ?? DEFAULT_PP} className='h-8 w-8 rounded-full' alt='' />,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className='font-[450]'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <div className='font-[450]'>{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className='font-[450] lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <div className='flex items-center space-x-2'>
          <div className={`h-3 w-3 rounded-full ${getStatusColor(row.getValue('status'))}`} />
          <div className='text-sm font-[450] capitalize'>{row.getValue('status')}</div>
        </div>
      )
    },
  },
  {
    accessorKey: 'subscription',
    header: 'Subscription',
    cell: ({ row }) => {
      return (
        <div className='flex items-center space-x-2'>
          <div className={`h-3 w-3 rounded-full ${getSubscriptionColor(row.getValue('subscription'))}`} />
          <div className='text-sm font-[450] capitalize'>{row.getValue('subscription')}</div>
        </div>
      )
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>
              <Pencil className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem> */}
            <DropdownMenuItem className='text-red-500'>
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem className='text-orange-500'>
              <Ban className='mr-2 h-4 w-4' />
              Ban
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className='w-full whitespace-pre'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='halka-bg halka-border ml-auto'>
              Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='halka-border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-black/5 dark:border-white/5'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='border-black/5 dark:border-white/5'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='border-black/5 dark:border-white/5'>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button variant='outline' size='sm' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div> */}
      {/* <DataTablePagination table={table} /> */}
      <div className='mt-5 flex items-center justify-center space-x-2'>
        <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          <span className='sr-only'>Go to first page</span>
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>
        <Button variant='outline' className='h-8 w-8 p-0' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <span className='sr-only'>Go to previous page</span>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>
        <Button variant='outline' className='h-8 w-8 p-0' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <span className='sr-only'>Go to next page</span>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          className='hidden h-8 w-8 p-0 lg:flex'
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className='sr-only'>Go to last page</span>
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}

export default function Users() {
  return (
    <>
      <DataTableDemo />
    </>
  )
}
