import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button } from './ui/button'

import { LayoutDashboard, BarChartBig, AreaChart } from 'lucide-react'

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
        src='https://scontent.frdp1-1.fna.fbcdn.net/v/t39.30808-1/399198331_2040878432947245_8411816941336063901_n.jpg?stp=c14.92.172.172a_dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=G8UwK8GIBuEAX8Qfp6v&_nc_ht=scontent.frdp1-1.fna&oh=00_AfDP468ZTTJOig9Qg5TeK0Iq6m3KYR5GjrvOA1CDDRBJsA&oe=655D227E'
        className='w-10 rounded-full'
      />
      <p className='text-sm font-semibold'>Sudipto Bain</p>
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
      <OptionItem navigate={navigate} path='/dashboard' currentPath={path} name='Dashboard' icon='home' />
      <OptionItem navigate={navigate} path='/about' currentPath={path} name='About' icon='info' />
      <OptionItem navigate={navigate} path='/contact' currentPath={path} name='Contact' icon='phone' />
    </div>
  )
}

function OptionItem({
  path,
  currentPath,
  name,
  icon,
  navigate,
}: {
  path: string
  currentPath: string
  name: string
  icon: string
  navigate: NavigateFunction
}) {
  return (
    <button
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 rounded-md text-left ${path === currentPath ? 'bg-main bg-opacity-10 ' : ''}`}
    >
      <div
        className={`flex items-center justify-between gap-3 p-3 px-4 text-sm font-medium ${
          path === currentPath ? 'text-[#eb3358]' : ''
        } `}
      >
        <BarChartBig className='h-6' />
        <span>{name}</span>
      </div>
    </button>
  )
}
