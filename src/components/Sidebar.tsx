import { useNavigate } from 'react-router-dom'
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

export default function Sidebar({ show }: { show: boolean }) {
  const navigate = useNavigate()
  show = true
  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full w-full bg-black bg-opacity-20 ${show ? 'block xl:hidden' : 'hidden'}`}
      ></div>
      <div
        className={`${show ? 'translate-x-0' : '-translate-x-full xl:-translate-x-0'} 
        xl:transparent fixed left-0 top-0 z-10 h-full w-72 transform border border-dashed
        border-transparent border-r-slate-500/20 bg-white transition-transform duration-300
        ease-in-out dark:bg-black xl:bg-transparent xl:dark:bg-transparent`}
      >
        <div className='flex h-full flex-col justify-between gap-3 p-5'>
          <div>
            <img src='AppIcons/full.png' className='w-24 p-3' />
            <UserCard />
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
