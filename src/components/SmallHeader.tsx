import { UserProfile } from '@/lib/types.ts'
import { ModeToggle } from './mode-toggle.tsx'
import { BarChart, BarChartBig, DollarSign, Keyboard, LogOut, Menu, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TapMotion from './TapMotion.tsx'
import { useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Profile from '@/Redux/profile.ts'

export function DropdownMenuDemo({ userProfile }: { userProfile: UserProfile }) {
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img src={userProfile?.profile_pic} className='aspect-square h-9 w-9 cursor-pointer rounded-full' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-5 mt-5 w-56 font-medium'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate('/edit_profile')
            }}
          >
            <User className='mr-2 h-4 w-4' />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BarChartBig className='mr-2 h-4 w-4' />
            Dashboard
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Keyboard className='mr-2 h-4 w-4' />
            Keyboard shortcuts
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          Log out
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function SmallHeader({ setShow }: { setShow: Function }) {
  const navigate = useNavigate()
  const userProfile: UserProfile = useSelector((state: any) => state.profile)
  return (
    <div className='flex w-full items-center justify-between p-3.5 xl:px-8'>
      <div>
        <Menu className='h-7 w-7 xl:hidden' onClick={() => setShow(true)} />
      </div>
      <div className='flex gap-3.5'>
        <ModeToggle />
        <TapMotion size='md'>
          <img
            src={userProfile?.profile_pic}
            className='aspect-square h-9 w-9 cursor-pointer rounded-full'
            onClick={() => navigate('/edit_profile')}
          />
        </TapMotion>
      </div>
    </div>
  )
}
