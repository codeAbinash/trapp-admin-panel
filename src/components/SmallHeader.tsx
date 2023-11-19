import { UserProfile } from '@/lib/types.ts'
import { ModeToggle } from './mode-toggle.tsx'
import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import TapMotion from './TapMotion.tsx'
import { useSelector } from 'react-redux'

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
