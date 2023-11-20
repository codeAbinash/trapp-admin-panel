import { Loading } from '@/components/Loading'
import TapMotion from '@/components/TapMotion'
import { PopupAlertType, usePopupAlertContext } from '@/context/PopupAlertContext'
import { delete_banner_f, get_banners_f } from '@/lib/api'
import transitions from '@/lib/transition'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

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

  // if (banners.length === 0)
  //   return (
  //     <div>
  //       <p className='mb-5 text-2xl font-bold'>Banners 🖼️</p>
  //       <div className='grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
  //         <div className='halka-bg flex aspect-video items-center justify-center rounded-2xl'>
  //           <p className='text-2xl font-bold'>No Banners Found</p>
  //         </div>
  //       </div>
  //     </div>
  //   )

  return (
    <div>
      <p className='mb-5 text-2xl font-bold'>Banners 🖼️</p>
      <div className='grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
        {banners?.map((banner) => {
          return (
            <div className='flex items-center justify-center' key={banner.id}>
              <div className='halka-bg group relative rounded-2xl p-5'>
                <div
                  className='tap95 halka-bg absolute right-2 top-2 cursor-pointer rounded-full bg-black/80 p-2.5 opacity-0 backdrop-blur-md transition duration-300 ease-in-out group-hover:opacity-100 dark:bg-white/80'
                  onClick={() => deleteBannerFn(banner.id, newPopup, loadBanners)}
                >
                  <TapMotion size='lg'>
                    <Trash2 className='h-5 w-5 text-red-500' />
                  </TapMotion>
                </div>
                <img src={banner.img_src} alt='' className='h-40 w-80 rounded-2xl  object-cover' />
              </div>
            </div>
          )
        })}
        <AddNewBanner />
      </div>
    </div>
  )
}

function AddNewBanner() {
  return (
    <div className='tap99 flex cursor-pointer items-center justify-center'>
      <div className='halka-bg group relative rounded-2xl p-5'>
        <div className='flex h-40 w-80  items-center justify-center rounded-2xl object-cover'>
          <Plus className='h-10 w-10 text-gray-400' />
        </div>
      </div>
    </div>
  )
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
                  subTitle: `Banner with id ${id} is being deleted.`,
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
                subTitle: `Banner with id ${id} has been deleted.`,
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
