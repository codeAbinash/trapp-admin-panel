import { Button } from '@/components/ui/button'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'

import { Loading } from '@/components/Loading'
import API from '@/lib/api'

export const defaultPagination = {
  first_page_url: API.users.get,
  last_page_url: '',
  links: [],
}

export type PaginationT = {
  first_page_url: string
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
  }[]
}

export default function Pagination({
  pagination,
  loadUsers,
  isLoading,
}: {
  pagination: PaginationT
  loadUsers: (url: string) => void
  isLoading: boolean
}) {
  if (isLoading)
    return (
      <div className='flex items-center gap-2'>
        <Button variant='outline' className='h-8 w-8 p-0' disabled>
          <DoubleArrowLeftIcon className='h-4 w-4' />
        </Button>

        <Button variant='outline' className='h-8 w-8 p-0' disabled>
          <ChevronLeftIcon className='h-4 w-4' />
        </Button>

        <div className='ml-10 mr-10 text-xs opacity-50'>
          <Loading text='Loading...' />
        </div>

        <Button variant='outline' className='h-8 w-8 p-0' disabled>
          <ChevronRightIcon className='h-4 w-4' />
        </Button>

        <Button variant='outline' className='h-8 w-8 p-0' disabled>
          <DoubleArrowRightIcon className='h-4 w-4' />
        </Button>
      </div>
    )

  return (
    <div className='flex items-center gap-2'>
      <Button variant='outline' className='h-8 w-8 p-0' onClick={() => loadUsers(pagination.first_page_url)} disabled={!pagination.first_page_url}>
        <DoubleArrowLeftIcon className='h-4 w-4' />
      </Button>
      {pagination.links.map((link, index) => {
        if (link.label === '&laquo; Previous')
          return (
            <Button variant='outline' className='h-8 w-8 p-0' disabled={!link.url} key={index} onClick={() => loadUsers(link.url as string)}>
              <ChevronLeftIcon className='h-4 w-4' />
            </Button>
          )
        if (link.label === 'Next &raquo;')
          return (
            <Button variant='outline' className='h-8 w-8 p-0' disabled={!link.url} key={index} onClick={() => loadUsers(link.url as string)}>
              <ChevronRightIcon className='h-4 w-4' />
            </Button>
          )
        else {
          return (
            <Button
              variant={link.active ? 'default' : 'outline'}
              className='h-8 w-8 p-0'
              key={index}
              disabled={!link.url}
              onClick={() => loadUsers(link.url as string)}
            >
              {link.label}
            </Button>
          )
        }
      })}
      <Button variant='outline' className='h-8 w-8 p-0' onClick={() => loadUsers(pagination.last_page_url)} disabled={!pagination.last_page_url}>
        <DoubleArrowRightIcon className='h-4 w-4' />
      </Button>
    </div>
  )
}
