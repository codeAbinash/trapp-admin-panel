import { ModeToggle } from './mode-toggle.tsx'
import { Menu } from 'lucide-react'

export default function SmallHeader({ setShow }: { setShow: Function }) {
  return (
    <div className='flex w-full items-center justify-between p-3.5 xl:px-8'>
      <div>
        <Menu className='h-7 w-7 xl:hidden' onClick={() => setShow(true)} />
      </div>
      <div className='flex gap-3.5'>
        <ModeToggle />
        <img src='https://github.com/shadcn.png' className='aspect-square h-9 w-9 rounded-full' />
      </div>
    </div>
  )
}
