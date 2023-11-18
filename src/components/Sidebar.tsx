import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button } from './ui/button'

import {
  LayoutDashboard,
  BarChartBig,
  AreaChart,
  LucideIcon,
  Brush,
  User2,
  Video,
  Gem,
  BadgePercent,
} from 'lucide-react'

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

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='w-full'>Log Out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? All of your saved data will be permanently removed. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function UserCard() {
  return (
    <div className='flex w-full items-center gap-4 rounded-xl bg-black/[0.05] p-4 px-5 dark:bg-white/5'>
      <img
        src='https://trappmartialarts.com/storage/users/profiles/Uv5GaHWh3aQ3fe0j9Z30TDCab8NQd06Nq3MW9r3w.jpg'
        className='w-10 rounded-full'
      />
      <p className='text-sm font-semibold'>Abinash Karmakar</p>
    </div>
  )
}

export default function Sidebar({ show, setShow }: { show: boolean; setShow: Function }) {
  const navigate = useNavigate()
  const location = useLocation()
  // console.log(location.pathname)
  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm ${
          show ? 'block xl:hidden' : 'hidden'
        }`}
        onClick={() => setShow(false)}
      ></div>
      <div
        className={`${show ? 'translate-x-0' : '-translate-x-full xl:-translate-x-0'} 
        xl:transparent fixed left-0 top-0 z-20 h-full w-72 transform border border-dashed
        border-transparent border-r-slate-500/20 bg-white transition-transform duration-300
        ease-in-out dark:bg-black xl:bg-transparent xl:dark:bg-transparent`}
      >
        <div className='flex h-full flex-col justify-between gap-3 p-5' onClick={() => setShow(false)}>
          <div className='flex flex-col gap-5'>
            <img src='AppIcons/full.svg' className='w-24 p-3' />
            <UserCard />
            <Options path={location.pathname} navigate={navigate} />
          </div>
          <div className='flex flex-col gap-2'>
            <AlertDialogDemo />
            <Button
              variant='outline'
              className='w-full'
              onClick={() => {
                navigate('/login')
              }}
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function Options({ path, navigate }: { path: string; navigate: NavigateFunction }) {
  return (
    <div className='flex flex-col gap-2'>
      <OptionItem navigate={navigate} path='/dashboard' currentPath={path} name='Dashboard' SideIcon={BarChartBig} />
      <OptionItem navigate={navigate} path='/creators' currentPath={path} name='Creators' SideIcon={Brush} />
      <OptionItem navigate={navigate} path='/users' currentPath={path} name='Users' SideIcon={User2} />
      <OptionItem navigate={navigate} path='/videos' currentPath={path} name='Videos' SideIcon={Video} />
      <OptionItem
        navigate={navigate}
        path='/price_management'
        currentPath={path}
        name='Price Management'
        SideIcon={Gem}
      />
      <OptionItem
        navigate={navigate}
        path='/creator_withdraw'
        currentPath={path}
        name='Creator Withdraw'
        SideIcon={BadgePercent}
      />
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
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 rounded-md text-left ${
        path === currentPath ? 'bg-main bg-opacity-10' : 'hover:bg-black/[0.05] dark:hover:bg-white/5'
      }`}
    >
      <div
        className={`flex items-center justify-between gap-3 p-3 px-4 text-sm font-medium ${
          path === currentPath ? 'text-main' : 'text-neutral-700 dark:text-neutral-300'
        } `}
      >
        <SideIcon className='h-[1.35rem]' />
        <span>{name}</span>
      </div>
    </button>
  )
}
