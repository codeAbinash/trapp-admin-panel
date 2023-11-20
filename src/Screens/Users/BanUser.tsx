import { Loading } from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { usePopupAlertContext } from '@/context/PopupAlertContext'
import { ban_user_f } from '@/lib/api'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useState } from 'react'

export default function BanUser({ open, setOpen, id }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; id: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [reason, setReason] = useState<string>('')
  const { newPopup } = usePopupAlertContext()
  async function banUser() {
    setIsLoading(true)
    const res = await ban_user_f(id, reason)
    setIsLoading(false)
    if (!res.status) return alert(res.message)
    setOpen(false)
    newPopup({
      title: 'User Banned',
      subTitle: `User with id ${id} has been banned. Refresh the page to see the changes.`,
    })
  }
  return (
    <Dialog open={open}>
      <DialogContent className='sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Ban this user?</DialogTitle>
          <DialogDescription>
            Are you sure you want to ban this user(User Id <span className='font-[500]'>{id}</span>)? If yes please provide a reason for the ban.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder='Type your message here.'
          className='w-full resize-none'
          rows={5}
          id='reason'
          name='reason'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          autoFocus
        />
        <DialogFooter>
          <div className='flex w-full flex-col gap-3'>
            <Button className='w-full' onClick={banUser} disabled={isLoading}>
              {isLoading ? <Loading text='Banning User...' invert='invert' /> : 'Ban User'}
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={() => {
                setOpen(false)
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
