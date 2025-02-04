import { useSelector } from 'react-redux'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

import {
  AreaChart,
  BadgePercent,
  BarChartBig,
  Brush,
  Code,
  GalleryHorizontal,
  Gem,
  LayoutGrid,
  LogOut,
  LucideIcon,
  StickerIcon,
  User2,
  Video,
} from 'lucide-react'

import store from '@/Redux/store'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { DEFAULT_PP } from '@/constants'
import ls from '@/lib/ls'
import transitions from '@/lib/transition'
import { UserProfile } from '@/lib/types'

export function LogoutPopupButton() {
  const navigate = useNavigate()
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='halka-bg w-full text-neutral-800 hover:text-white dark:text-neutral-200'>
          Log Out <LogOut className='h-4 pl-2' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to log out?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              ls.clear()
              navigate('/', { replace: true })
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function UserCard() {
  const navigate = useNavigate()
  const userProfile: UserProfile = useSelector((state: ReturnType<typeof store.getState>) => state.profile)
  return (
    <div className='halka-bg tap97 flex w-full cursor-pointer items-center gap-4 rounded-xl p-4 px-5' onClick={() => navigate('/edit_profile')}>
      <img src={userProfile?.profile_pic ?? DEFAULT_PP} className='h-10 w-10 rounded-full' />
      <p className='text-sm font-semibold'>{userProfile?.name || 'Loading...'}</p>
    </div>
  )
}

export default function Sidebar({ show, setShow }: { show: boolean; setShow: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location.pathname)
  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm ${show ? 'block xl:hidden' : 'hidden'}`}
        onClick={() => setShow(false)}
      ></div>
      <div
        className={`${show ? 'translate-x-0' : '-translate-x-full xl:-translate-x-0'} xl:transparent
        fixed left-0 top-0 z-20 h-full w-72 transform overflow-x-hidden border border-dashed border-transparent
        border-r-slate-500/20 bg-white transition-transform duration-300
        ease-in-out dark:bg-black xl:bg-transparent xl:dark:bg-transparent`}
      >
        <div className='flex h-full flex-col justify-between gap-3 p-5' onClick={() => setShow(false)}>
          <div className='flex flex-col gap-5'>
            <img src='AppIcons/full.svg' className='w-24 p-3' />
            <UserCard />
            <Options path={location.pathname} navigate={navigate} />
          </div>
          <div className='flex flex-col gap-2'>
            <LogoutPopupButton />
          </div>
        </div>
      </div>
    </>
  )
}

function Options({ path, navigate }: { path: string; navigate: NavigateFunction }) {
  return (
    <div className='flex flex-col gap-2'>
      <OptionItem navigate={navigate} path='/' currentPath={path} name='Dashboard' SideIcon={BarChartBig} />
      <OptionItem navigate={navigate} path='/banners' currentPath={path} name='Banners' SideIcon={GalleryHorizontal} />
      <OptionItem navigate={navigate} path='/users' currentPath={path} name='Users' SideIcon={User2} />
      <OptionItem navigate={navigate} path='/creators' currentPath={path} name='Creators' SideIcon={Brush} />
      <OptionItem navigate={navigate} path='/videos' currentPath={path} name='Videos' SideIcon={Video} />
      <OptionItem navigate={navigate} path='/categories' currentPath={path} name='Categories' SideIcon={LayoutGrid} />
      <OptionItem navigate={navigate} path='/sticker_management' currentPath={path} name='Sticker Management' SideIcon={StickerIcon} />
      <OptionItem navigate={navigate} path='/price_management' currentPath={path} name='Price Management' SideIcon={Gem} />
      <OptionItem navigate={navigate} path='/creator_withdraw' currentPath={path} name='Creator Withdraw' SideIcon={BadgePercent} />
      {/* <OptionItem navigate={navigate} path='/code' currentPath={path} name='Code' SideIcon={Code} /> */}
    </div>
  )
}

function OptionItem({
  path,
  currentPath,
  name,
  SideIcon = AreaChart,
  navigate,
}: {
  path: string
  currentPath: string
  name: string
  SideIcon?: LucideIcon
  navigate: NavigateFunction
}) {
  return (
    <button
      onClick={transitions(() => navigate(path))}
      className={`flex items-center gap-3 rounded-md text-left ${path === currentPath ? 'bg-main bg-opacity-10' : 'halka-bg-hover'}`}
    >
      <div
        className={`flex items-center justify-between gap-3 p-3 px-4 text-sm font-medium ${
          path === currentPath ? 'text-main' : 'text-neutral-700 dark:text-neutral-300'
        } `}
      >
        <SideIcon className='h-[1.35rem]' />
        <span>{name || ''}</span>
      </div>
    </button>
  )
}
