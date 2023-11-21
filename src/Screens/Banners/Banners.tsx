import { Loading } from '@/components/Loading'
import TapMotion from '@/components/TapMotion'
import { PopupAlertType, usePopupAlertContext } from '@/context/PopupAlertContext'
import { create_banner_f, delete_banner_f, get_banners_f } from '@/lib/api'
import transitions from '@/lib/transition'
import { userMessage } from '@/lib/types'
import { Plus, Trash2, Upload } from 'lucide-react'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

type Banner = {
  id: number
  img_src: string
  action: string
}
type Banners = Banner[] | null

function Banners() {
  const [banners, setBanners] = useState<Banners>(null)
  const { newPopup } = usePopupAlertContext()
  async function loadBanners() {
    setBanners(null)
    const res = await get_banners_f()
    if (!res.status) return
    setBanners(res.data.data)
    console.log(res.data.data)
  }

  useEffect(() => {
    loadBanners()
  }, [])

  if (!banners)
    return (
      <div>
        <p className='mb-5 text-2xl font-bold'>Banners 🖼️</p>
        <div className='grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
            return <div className='halka-bg flex aspect-video items-center justify-center rounded-2xl' key={num}></div>
          })}
        </div>
      </div>
    )

  return (
    <div>
      <p className='mb-5 text-2xl font-bold'>Banners 🖼️</p>
      <div className='grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
        <AddNewBanner loadBanners={loadBanners} />

        {banners?.map((banner) => {
          return (
            <div className='flex w-full items-center justify-center' key={banner.id}>
              <div className='halka-bg group relative w-full rounded-2xl p-5'>
                <div
                  className='tap95 absolute right-2 top-2 cursor-pointer rounded-full bg-white/80 p-2.5 opacity-0 backdrop-blur-md transition duration-300 ease-in-out group-hover:opacity-100 dark:bg-black/50'
                  onClick={() => deleteBannerFn(banner.id, newPopup, loadBanners)}
                >
                  <TapMotion size='lg'>
                    <Trash2 className='h-5 w-5 text-red-500' />
                  </TapMotion>
                </div>
                <img src={banner.img_src} alt='' className='aspect-[2/1] w-full rounded-2xl  object-cover' />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AddNewBanner({ loadBanners }: { loadBanners: () => void }) {
  const { newPopup } = usePopupAlertContext()
  const pp = useRef<HTMLInputElement>(null)
  const onChangeFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files
    const ppValidation = profilePicFileValidation(pp.current!.files![0])
    if (ppValidation.error) {
      newPopup({ title: 'Invalid File', subTitle: ppValidation.message })
      pp.current!.value = ''
      return
    }
    addNewBannerFn(fileInput, pp, newPopup, loadBanners)
  }, [])
  return (
    <div
      className='tap99 flex aspect-[2/1] h-full w-full cursor-pointer items-center justify-center'
      onClick={() => {
        pp.current!.click()
      }}
    >
      <input
        type='file'
        className='hidden'
        ref={pp}
        onChange={onChangeFileSelect}
        accept='image/png, image/jpeg, image/jpg'
      />
      <div className='halka-bg group relative flex h-full w-full items-center justify-center rounded-2xl p-5'>
        <Plus className='h-10 w-10 text-gray-400' />
      </div>
    </div>
  )
}

function addNewBannerFn(
  fileInput: FileList | null,
  pp: RefObject<HTMLInputElement>,
  newPopup: (popup: PopupAlertType) => void,
  loadBanners: () => void,
) {
  transitions(() => {
    newPopup({
      title: 'Upload This Banner?',
      subTitle: (
        <div className='w-full'>
          <img
            src={URL.createObjectURL(fileInput![0])}
            alt=''
            className='aspect-[2/1] w-full rounded-2xl object-cover'
          />
          <p className='mt-3'>Are you sure you want to upload this banner?</p>
        </div>
      ),
      action: [
        {
          text: 'Cancel',
          onClick: () => {
            pp.current!.value = ''
          },
        },
        {
          text: <span className='text-green-500'>Upload</span>,
          onClick: async () => {
            setTimeout(() => {
              transitions(() =>
                newPopup({
                  title: (
                    <div className='flex'>
                      <Loading /> Please Wait
                    </div>
                  ),
                  subTitle: (
                    <div>
                      <img
                        src={URL.createObjectURL(fileInput![0])}
                        alt=''
                        className='aspect-[2/1] w-full rounded-2xl object-cover'
                      />
                      <p className='mt-3'>
                        Banner is being uploaded. Please do not close the app or refresh the page. This may take a few
                        seconds.
                      </p>
                    </div>
                  ),
                  action: [],
                }),
              )()
            }, 500)
            const body = new FormData()
            body.append('banner_image', fileInput![0])
            const res = await create_banner_f(body)
            console.log(res)
            if (!res.status) return transitions(() => newPopup({ title: 'Error', subTitle: res.message }))()
            transitions(() =>
              newPopup({
                title: 'Banner Uploaded',
                subTitle: `Banner has been uploaded.`,
              }),
            )()
            loadBanners()
          },
        },
      ],
    })
  })()
}

function profilePicFileValidation(file: File): userMessage {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  const maxSize = 2 * 1024 * 1024
  console.log(file)
  if (!allowedTypes.includes(file.type))
    return {
      message: 'Invalid file type (only .png, .jpeg, .jpg)',
      error: true,
    }
  if (file.size > maxSize)
    return {
      message: 'Max File Size is 2MB',
      error: true,
    }
  return { message: '', error: false }
}

async function deleteBannerFn(id: number, newPopup: (popup: PopupAlertType) => void, loadBanners: () => void) {
  transitions(() =>
    newPopup({
      title: 'Delete Banner',
      subTitle: 'Are you sure you want to delete this banner? This action cannot be undone.',
      action: [
        {
          text: <span className='text-red-500'>Delete Banner</span>,
          onClick: async () => {
            setTimeout(() => {
              transitions(() =>
                newPopup({
                  title: (
                    <div className='flex'>
                      <Loading /> Please Wait
                    </div>
                  ),
                  subTitle: `Banner is being deleted.`,
                  action: [],
                }),
              )()
            }, 500)

            const res = await delete_banner_f(id)
            console.log(res)
            if (!res.status) return transitions(() => newPopup({ title: 'Error', subTitle: res.message }))()
            transitions(() =>
              newPopup({
                title: 'Banner Deleted',
                subTitle: `Banner has been deleted.`,
              }),
            )()
            loadBanners()
          },
        },
        { text: 'Cancel' },
      ],
    }),
  )()
}

export default Banners
