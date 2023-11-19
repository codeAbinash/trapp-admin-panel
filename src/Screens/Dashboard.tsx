import { get_counts_f } from '@/lib/api'
import { DashboardCounts } from '@/lib/types'
import { increaseCount } from '@/lib/utils'
import { useCallback, useEffect, useState } from 'react'

function Dashboard() {
  return <Cards />
}

function Cards() {
  const [countCreators, setCountCreators] = useState(0)
  const [countLive, setCountLive] = useState(0)
  const [countUsers, setCountUsers] = useState(0)
  const [countVideos, setCountVideos] = useState(0)

  const loadCounts = useCallback(async () => {
    const res = await get_counts_f()
    if (!res.status) return
    const data: DashboardCounts = res.data.dash_counts
    increaseCount(data?.creators || 0, setCountCreators)
    increaseCount(data?.live || 0, setCountLive)
    increaseCount(data?.users || 0, setCountUsers)
    increaseCount(data?.videos || 0, setCountVideos)
  }, [setCountCreators, setCountLive, setCountUsers, setCountVideos])

  useEffect(() => {
    loadCounts()
  }, [loadCounts])

  return (
    <div className='space-y-4 px-2'>
      <div>
        <p className='text-2xl font-bold'>Hi, Welcome back 👋</p>
      </div>
      <div className='flex flex-wrap gap-5  pt-5'>
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_users.png'
          count={countUsers.toString()}
          title='Total Users'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png'
          count={countCreators.toString()}
          title='Total Creators'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_buy.png'
          count={countVideos.toString()}
          title='Total Videos'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_message.png'
          count={countLive.toString()}
          title='Total Live'
        />
      </div>
      <div>{/* <img src='./AppIcons/square.svg' alt='' /> */}</div>
    </div>
  )
}
function CardCount({ count = '0', title = 'text', icon = '' }: { count?: string; title?: string; icon?: string }) {
  return (
    <div className='halka-bg flex h-28 w-[100%] items-center gap-4 rounded-2xl p-5 sm:w-[48%] lg:w-[23%] '>
      <div>
        <img src={icon} alt='' className='h-16' />
      </div>
      <div>
        <div className='text-2xl font-semibold'>{count}</div>
        <div className='text-sm font-medium opacity-70'>{title}</div>
      </div>
    </div>
  )
}

export default Dashboard
