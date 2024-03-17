import Coin from '@/components/Coin'
import { Loading } from '@/components/Loading'
import TapMotion from '@/components/TapMotion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NewPopupFn, SetPopupsFn, usePopupAlertContext } from '@/context/PopupAlertContext'
import { create_sticker_f, delete_sticker_f, get_stickers_f } from '@/lib/api'
import { KB } from '@/lib/constants'
import { nFormatter, picFileValidation } from '@/lib/utils'
import { ImagePlusIcon, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

type Sticker = {
  name: string
  id: number
  price: number
  sticker_src: string
}

function Stickers() {
  const { newPopup } = usePopupAlertContext()
  const [stickers, setStickers] = useState<Sticker[] | null>(null)

  async function loadStickers() {
    setStickers(null)
    const response = await get_stickers_f()
    if (!response.status) return
    console.log(response.data)
    setStickers(response.data.data)
  }

  useEffect(() => {
    loadStickers()
  }, [])

  return (
    <div className='flex w-full flex-wrap gap-5'>
      <CreateSticker loadStickers={loadStickers} />
      {stickers == null && (
        <>
          <StickerSkeleton />
          <StickerSkeleton />
          <StickerSkeleton />
          <StickerSkeleton />
          <StickerSkeleton />
          <StickerSkeleton />
          <StickerSkeleton />
          <StickerSkeleton />
        </>
      )}
      {stickers?.map((sticker) => (
        <div className='group relative flex flex-col items-center justify-center gap-4 rounded-md px-4' key={sticker.id}>
          <div
            className='tap95 absolute right-2 top-2 cursor-pointer rounded-full bg-white/80 p-2.5 opacity-0 backdrop-blur-md transition duration-300 ease-in-out group-hover:opacity-100 dark:bg-black/50'
            onClick={() => {
              deleteSticker(sticker.id, newPopup, loadStickers)
            }}
          >
            <TapMotion size='lg'>
              <Trash2 className='h-5 w-5 text-red-500' />
            </TapMotion>
          </div>
          <img src={sticker.sticker_src} alt='' className='h-36 w-36 object-contain' />
          <div className='flex items-center justify-center gap-3 text-lg font-semibold'>
            <Coin />
            {nFormatter(sticker.price)}
          </div>
        </div>
      ))}
    </div>
  )
}

function createSticker(
  f: FileList | null,
  pic: React.RefObject<HTMLInputElement>,
  newPopup: NewPopupFn,
  setPopups: SetPopupsFn,
  loadStickers: () => Promise<void>,
) {
  newPopup({
    title: <NewStickerPopupUI f={f} pic={pic} newPopup={newPopup} setPopups={setPopups} loadStickers={loadStickers} />,
    subTitle: '',
    action: [],
  })
}

function NewStickerPopupUI({
  f,
  pic,
  newPopup,
  setPopups,
  loadStickers,
}: {
  f: FileList | null
  pic: React.RefObject<HTMLInputElement>
  newPopup: NewPopupFn
  setPopups: SetPopupsFn
  loadStickers: () => Promise<void>
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  async function uploadSticker() {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('name', title.trim())
    formData.append('price', price.trim())
    formData.append('stickers', f![0])

    const res = await create_sticker_f(formData)
    console.log(res)
    if (!res.status) alert(res.message)
    setIsLoading(false)
    newPopup({ title: 'Success', subTitle: 'Sticker created successfully' })
    loadStickers()
  }

  return (
    <div className='flex flex-col gap-4'>
      <img src={f == null ? '' : URL.createObjectURL(f[0])} className='mx-auto h-36 w-36 object-contain' alt='' />
      <Input placeholder='Sticker Name' className='mt-5' value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder='Sticker Price' type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
      <Button className='mt-2' onClick={uploadSticker} disabled={isLoading || !title.trim() || !price.trim() || !pic.current?.files![0]}>
        {isLoading && <Loading />}
        {isLoading ? 'Creating Sticker' : 'Create Sticker'}
      </Button>
      <Button onClick={() => setPopups([])}>Cancel</Button>
    </div>
  )
}

function CreateSticker({ loadStickers }: { loadStickers: () => Promise<void> }) {
  const { newPopup, setPopups } = usePopupAlertContext()

  const pic = useRef<HTMLInputElement>(null)

  const onChangeFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files
    const ppValidation = picFileValidation(pic.current!.files![0], 100 * KB, '100KB')
    if (ppValidation.error) {
      newPopup({ title: 'Invalid File', subTitle: ppValidation.message })
      pic.current!.value = ''
      return
    }
    createSticker(fileInput, pic, newPopup, setPopups, loadStickers)
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-md px-4'>
      <TapMotion
        onClick={() => pic.current?.click()}
        size='lg'
        className='halka-bg flex h-36 w-36 flex-none cursor-pointer items-center justify-center rounded-2xl'
      >
        <ImagePlusIcon className='h-7 w-7 rounded-lg opacity-80' />
      </TapMotion>
      <input type='file' className='hidden' ref={pic} onChange={onChangeFileSelect} accept='image/png, image/jpeg, image/jpg, image/gif' />
      <p>New Sticker</p>
    </div>
  )
}

async function deleteSticker(id: number, newPopup: NewPopupFn, loadStickers: () => Promise<void>) {
  newPopup({
    title: 'Delete Sticker',
    subTitle: 'Are you sure you want to delete this sticker?',
    action: [
      {
        text: 'Cancel',
      },
      {
        text: <span className='text-red-500'>Delete Sticker</span>,
        onClick: async () => {
          setTimeout(async () => {
            newPopup({
              title: (
                <div className='flex'>
                  <Loading /> Please Wait
                </div>
              ),
              subTitle: `Sticker is being deleted.`,
              action: [],
            })
          }, 500)

          const res = await delete_sticker_f(id)
          console.log(res)
          if (!res.status) return newPopup({ title: 'Error', subTitle: res.message })
          loadStickers()
          newPopup({ title: 'Success', subTitle: 'Sticker deleted successfully' })
        },
      },
    ],
  })
}

export function StickerSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-md px-4'>
      <div className='halka-bg h-36 w-36 animate-pulse rounded-2xl' />
      <p className='halka-bg h-4 w-3/5 animate-pulse rounded-sm'></p>
    </div>
  )
}

export default function StickerManagement() {
  return (
    <div>
      <p className='mb-5 text-2xl font-bold'>Sticker Management</p>
      <Stickers />
    </div>
  )
}
