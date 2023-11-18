import { NavigateFunction, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button } from './ui/button'

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
      <img src='https://github.com/shadcn.png' className='w-10 rounded-full' />
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
          <div>
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
    <Button
      variant='outline'
      className={`flex w-full items-center gap-2 ${
        path === currentPath ? 'bg-black bg-opacity-10 dark:bg-white/10' : ''
      }`}
      onClick={() => navigate(path)}
    >
      <span className='text-xl'></span>
      <span className='text-lg'>{name}</span>
    </Button>
  )
}
