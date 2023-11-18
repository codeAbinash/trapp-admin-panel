import Sidebar from '@/components/Sidebar'
import SmallHeader from '@/components/SmallHeader'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div className='gradient'>
      <Sidebar show={isSidebarOpen} setShow={setIsSidebarOpen} />
      <div className='min-h-[100dvh] w-full translate-x-0 xl:w-[calc(100%-18rem)] xl:translate-x-72'>
        <SmallHeader setShow={setIsSidebarOpen} />
        <div className='px-5 xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
