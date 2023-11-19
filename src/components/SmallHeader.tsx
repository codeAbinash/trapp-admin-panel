import { UserProfile } from '@/lib/types.ts'
import { ModeToggle } from './mode-toggle.tsx'
import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TapMotion from './TapMotion.tsx'

export default function SmallHeader({ setShow, userProfile }: { setShow: Function; userProfile: UserProfile }) {
  const navigate = useNavigate()
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
