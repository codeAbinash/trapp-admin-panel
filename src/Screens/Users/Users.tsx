import { ChevronDownIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import Pagination, { PaginationT, defaultPagination } from './Pagination'

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

import { Loading } from '@/components/Loading'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { usePopupAlertContext } from '@/context/PopupAlertContext'
import API, { ban_user_f, delete_user_f, get_users_f, unban_user_f } from '@/lib/api'
import { getStatusColor, getSubscriptionColor } from '@/lib/utils'
import { Ban, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { User } from './data'

function BanUser({ open, setOpen, id }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; id: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [reason, setReason] = useState<string>('')
  const { newPopup } = usePopupAlertContext()
  async function banUser() {
    setIsLoading(true)
    const res = await ban_user_f(id, reason)
    setIsLoading(false)
    if (!res.status) return alert(res.message)
    setOpen(false)
    newPopup({
      title: 'User Banned',
      subTitle: `User with id ${id} has been banned. Refresh the page to see the changes.`,
    })
  }
  return (
    <Dialog open={open}>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Ban this user?</DialogTitle>
          <DialogDescription>
            Are you sure you want to ban this user(User Id <span className='font-[500]'>{id}</span>)? If yes please provide a reason for the ban.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder='Type your message here.'
          className='w-full resize-none'
          rows={5}
          id='reason'
          name='reason'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          autoFocus
        />
        <DialogFooter>
          <div className='flex w-full flex-col gap-3'>
            <Button className='w-full' onClick={banUser} disabled={isLoading}>
              {isLoading ? <Loading text='Banning User...' /> : 'Ban User'}
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DeleteUser({ open, setOpen, id }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; id: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { newPopup } = usePopupAlertContext()
  async function banUser() {
    setIsLoading(true)
    const res = await delete_user_f(id)
    setIsLoading(false)
    console.log(res)
    if (!res.status) return alert(res.message)
    setOpen(false)
    newPopup({
      title: 'User Deleted',
      subTitle: `User with id ${id} has been deleted. Refresh the page to see the changes.`,
    })
  }
  return (
    <Dialog open={open}>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Ban this user?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user(User Id <span className='font-[500]'>{id}</span>)? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex w-full flex-col gap-3'>
            <Button className='w-full' onClick={banUser} disabled={isLoading}>
              {isLoading ? <Loading text='Deleting User...' /> : 'Delete User'}
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function UnBanUser({ open, setOpen, id }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; id: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { newPopup } = usePopupAlertContext()
  async function unbanUser() {
    setIsLoading(true)
    const res = await unban_user_f(id)
    setIsLoading(false)
    console.log(res)
    if (!res.status) return alert(res.message)
    setOpen(false)
    newPopup({
      title: 'User Unbanned',
      subTitle: `User with id ${id} has been unbanned. Refresh the page to see the changes.`,
    })
  }
  return (
    <Dialog open={open}>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Unban this user?</DialogTitle>
          <DialogDescription>
            Are you sure you want to unban this user(User Id <span className='font-[500]'>{id}</span>)? The user will be able to login again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className='flex w-full flex-col gap-3'>
            <Button className='w-full' onClick={unbanUser} disabled={isLoading}>
              {isLoading ? <Loading text='Unban User...' /> : 'Unban User'}
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const columns: ColumnDef<User>[] = [
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
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className='font-[450]'>{row.getValue('id')}</div>,
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
      const [deletePopup, setDeletePopup] = useState(false)
      const [banPopup, setBanPopup] = useState(false)
      const [unbanPopup, setUnbanPopup] = useState(false)

      return (
        <DropdownMenu>
          <DeleteUser open={deletePopup} setOpen={setDeletePopup} id={row.getValue('id')} />
          <BanUser open={banPopup} setOpen={setBanPopup} id={row.getValue('id')} />
          <UnBanUser open={unbanPopup} setOpen={setUnbanPopup} id={row.getValue('id')} />
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='text-red-500'
              onClick={() => {
                setDeletePopup(true)
              }}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete User
            </DropdownMenuItem>

            {row.getValue('status') === 'banned' ? (
              <DropdownMenuItem
                className='text-green-500'
                onClick={() => {
                  setUnbanPopup(true)
                }}
              >
                <Ban className='mr-2 h-4 w-4' />
                Unban User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className='text-orange-500'
                onClick={() => {
                  setBanPopup(true)
                }}
              >
                <Ban className='mr-2 h-4 w-4' />
                Ban User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

type ServerResponse = {
  id: number
  name: string
  country_code: string
  phone: string
  email: string
  profile_pic: string
  created_at: string
  updated_at: string
  user_blocked: {
    id: number
    user_id: string
    reason: string
    created_at: string
    updated_at: string
  } | null
}

function generateOrganizedData(data: ServerResponse[]) {
  const organizedData: User[] = data.map((user) => {
    const obj: User = {
      id: user.id,
      name: user.name,
      country_code: user.country_code,
      phone: user.phone,
      email: user.email,
      profile_pic: user.profile_pic,
      created_at: user.created_at,
    }
    obj.status = user.user_blocked ? 'banned' : 'regular'
    obj.phone = user.country_code + ' ' + user.phone
    return obj
  })
  return organizedData
}

export default function Users() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [users, setUsers] = useState<User[] | null>(null)
  const [pagination, setPagination] = useState<PaginationT>(defaultPagination)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers(url = API.users.get) {
    setIsLoading(true)
    const res = await get_users_f(url)
    setIsLoading(false)
    if (!res.status) return
    console.log(res.data.data.data)
    setUsers(generateOrganizedData(res.data.data.data))
    setPagination({
      first_page_url: res.data.data.first_page_url,
      last_page_url: res.data.data.last_page_url,
      links: res.data.data.links,
    })
  }

  const table = useReactTable({
    data: users || [],
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
                  {!users ? <Loading text='Loading Users...' /> : users.length ? 'No results.' : 'No users found.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='mt-12 flex items-center justify-center space-x-2 '>
        <Pagination pagination={pagination} loadUsers={loadUsers} isLoading={isLoading} />
      </div>
    </div>
  )
}
