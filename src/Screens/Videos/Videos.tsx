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

import Pagination from './Pagination'

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
import { NEXT_POPUP_DELAY } from '@/config'
import { PopupAlertType, usePopupAlertContext } from '@/context/PopupAlertContext'
import API, { delete_video_f, get_videos_list_f } from '@/lib/api'
import transitions from '@/lib/transition'
import { EyeIcon, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { PaginationT, defaultPagination } from './types'

function getReducedString(str: string, len = 30) {
  if (!str) return str
  if (str.length <= len) return str
  return str.slice(0, len) + '...'
}

function formattedDate(date: string) {
  return new Date(date).toLocaleDateString('en-US')
}

function deleteVideo(id: number, newPopup: (popup: PopupAlertType) => void, navigate: NavigateFunction) {
  newPopup({
    title: 'Delete Video',
    subTitle: 'Are you sure you want to delete this video?',
    action: [
      {
        text: <span className='text-red-500'>Yes</span>,
        onClick: async () => {
          setTimeout(() => {
            newPopup({
              title: (
                <span className='flex'>
                  <Loading /> Please Wait...
                </span>
              ),
              subTitle: 'Deleting video with id ' + id,
              action: [],
            })
          }, NEXT_POPUP_DELAY)

          const res = await delete_video_f(id)
          if (!res.status) return transitions(() => newPopup({ title: 'Error', subTitle: res.message }))()
          newPopup({
            title: 'Video Deleted',
            subTitle: 'Video deleted successfully.',
            action: [
              {
                text: 'OK',
                onClick: () => {
                  navigate(0)
                },
              },
            ],
          })
        },
      },
      {
        text: 'No',
        onClick: () => {
          console.log('no delete video')
        },
      },
    ],
  })
}

export interface VideoData {
  id: number
  creator_id: string
  title: string
  description: string
  privacy: string
  thumbnail: string
  video_loc: string
  video_type: string
  created_at: string
  updated_at: string
  details: JSX.Element
  channel_name: string
  cat_id: string
  views: number
  live_api_data: null
  playlist_id: null
  video_duration: string
  like_count: string
  dislike_count: string
  creator: Creator
}

export interface Creator {
  id: number
  channel_name: string
}

const columns: ColumnDef<VideoData>[] = [
  {
    accessorKey: 'thumbnail',
    header: 'Thumbnail',
    cell: ({ row }) => (
      <img src={row.getValue('thumbnail') ?? DEFAULT_PP} className='aspect-video h-[4.5rem] w-[8rem] rounded-sm object-cover' alt='' />
    ),
  },
  {
    accessorKey: 'details',
    header: 'Details',
    cell: ({ row }) => <p>{row.getValue('details')}</p>,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => <div className='line-clamp-1 max-w-[30ch] break-words font-[450]'>{getReducedString(row.getValue('title'))}</div>,
  },
  {
    accessorKey: 'video_type',
    header: 'Type',
    cell: ({ row }) => <div className='font-[450] capitalize'>{row.getValue('video_type')}</div>,
  },
  {
    accessorKey: 'privacy',
    header: 'Privacy',
    cell: ({ row }) => <div className='font-[450] capitalize'>{row.getValue('privacy')}</div>,
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => <div className='font-[450]'>{formattedDate(row.getValue('created_at'))}</div>,
  },
  {
    accessorKey: 'id',
    header: 'Video ID',
    cell: ({ row }) => <div className='font-[450]'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'channel_name',
    header: 'Channel Name',
    cell: ({ row }) => <div className='font-[450]'>{row.getValue('channel_name')}</div>,
  },
  {
    id: 'actions',
    header: 'Action',
    enableHiding: false,
    cell: ({ row }) => {
      const { newPopup } = usePopupAlertContext()
      const navigate = useNavigate()

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

            <DropdownMenuItem
              className='text-red-500'
              onClick={() => {
                deleteVideo(row.getValue('id'), newPopup, navigate)
              }}
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Delete Video
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function Videos() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [videos, setVideos] = useState<VideoData[] | null>(null)
  const [pagination, setPagination] = useState<PaginationT>(defaultPagination)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    loadVideos()
  }, [])

  async function loadVideos(url = API.videos.list) {
    setIsLoading(true)
    const res = await get_videos_list_f(url)
    setIsLoading(false)
    if (!res.status) return
    console.log(res.data.data.data)

    setVideos(generateOrganizedData(res.data.data.data))
    // setVideos(res.data.data.data)

    setPagination({
      first_page_url: res.data.data.first_page_url,
      last_page_url: res.data.data.last_page_url,
      links: res.data.data.links,
    })
  }

  const table = useReactTable({
    data: videos || [],
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
    <div className='w-full whitespace-pre pb-10'>
      <p className='text-2xl font-bold'>Video List 🎥</p>

      <div className='flex items-center gap-2 py-4'>
        <Input
          placeholder='Filter Videos...'
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
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
                    {/* {column.id} */}
                    {column.columnDef.header as string}
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
                  {!videos ? <Loading text='Loading Videos...' invert='auto' /> : videos.length ? 'No results.' : 'No video found.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-center space-x-2 '>
        <Pagination pagination={pagination} loadVideos={loadVideos} isLoading={isLoading} />
      </div>
    </div>
  )
}

function generateOrganizedData(data: VideoData[]) {
  const organizedData: VideoData[] = data.map((user) => {
    const obj: VideoData = {
      id: user.id,
      creator_id: user.creator_id,
      title: user.title,
      description: user.description ?? '',
      privacy: user.privacy,
      thumbnail: user.thumbnail,
      video_loc: user.video_loc,
      video_type: user.video_type,
      created_at: user.created_at,
      updated_at: user.updated_at,
      channel_name: user.creator.channel_name,
      cat_id: user.cat_id,
      views: user.views,
      live_api_data: null,
      video_duration: '00:00:00',
      like_count: user.like_count,
      dislike_count: user.dislike_count,
      playlist_id: null,
      creator: user.creator,
      details: (
        <div className='flex gap-5'>
          <div className='flex flex-col items-center justify-center'>
            {user.views}
            <EyeIcon size={15} />
          </div>
          <div className='flex flex-col items-center justify-center'>
            {user.like_count}
            <ThumbsUp size={15} />
          </div>
          <div className='flex flex-col items-center justify-center'>
            {user.dislike_count}
            <ThumbsDown size={15} />
          </div>
        </div>
      ),
    }
    return obj
  })
  return organizedData
}
