import { Loading } from '@/components/Loading'
import TapMotion from '@/components/TapMotion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NewPopupFn, SetPopupsFn, usePopupAlertContext } from '@/context/PopupAlertContext'
import { create_price_f, delete_price_f, fetch_prices_f } from '@/lib/api'
import { nFormatter } from '@/lib/utils'
import { PlusIcon, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
export interface Price {
  id: number
  coins: number
  price: number
  created_at: null
  updated_at: null
}

export default function PriceManagement() {
  const [prices, setPrices] = useState<Price[] | null>(null)
  const { newPopup } = usePopupAlertContext()

  async function loadPrices() {
    setPrices(null)
    const res = await fetch_prices_f()
    if (!res.status) return
    console.log(res.data)
    setPrices(res.data.data)
  }

  useEffect(() => {
    loadPrices()
  }, [])

  return (
    <div>
      <p className='mb-5 text-2xl font-bold'>Price Management</p>
      <div className='flex w-full flex-wrap gap-5'>
        <CreatePrice loadPrices={loadPrices} />
        {prices == null && (
          <>
            <PriceSkeleton />
            <PriceSkeleton />
            <PriceSkeleton />
            <PriceSkeleton />
            <PriceSkeleton />
            <PriceSkeleton />
            <PriceSkeleton />
            <PriceSkeleton />
          </>
        )}
        {prices?.map((price) => (
          <div className='group relative flex flex-col items-center justify-center gap-4 rounded-md px-4' key={price.id}>
            <div
              className='tap95 absolute right-2 top-2 cursor-pointer rounded-full bg-white/80 p-2.5 opacity-0 backdrop-blur-md transition duration-300 ease-in-out group-hover:opacity-100 dark:bg-black/50'
              onClick={() => {
                deletePrice(price.id, newPopup, loadPrices)
              }}
            >
              <TapMotion size='lg'>
                <Trash2 className='h-5 w-5 text-red-500' />
              </TapMotion>
            </div>
            <img src='/AppIcons/full.svg' alt='' className='border-color/20 bg-color/20 mx-auto aspect-square h-36 w-36 rounded-full border p-7' />

            <div className='flex items-center justify-center text-sm font-medium'>
              {nFormatter(price.coins)} coins/ ${nFormatter(price.price)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

async function deletePrice(id: number, newPopup: NewPopupFn, loadPrices: () => void) {
  newPopup({
    title: 'Delete Price',
    subTitle: 'Are you sure you want to delete this price?',
    action: [
      {
        text: 'Cancel',
      },
      {
        text: <span className='text-red-500'>Delete Price</span>,
        onClick: async () => {
          setTimeout(() => {
            newPopup({
              title: (
                <div className='flex'>
                  <Loading />
                  Deleting Price
                </div>
              ),
              subTitle: '',
              action: [],
            })
          }, 500)

          const res = await delete_price_f(id)
          if (!res.status) return alert(res.message)
          loadPrices()
          newPopup({ title: 'Success', subTitle: 'Price deleted successfully' })
        },
      },
    ],
  })
}

function CreatePrice({ loadPrices }: { loadPrices: () => void }) {
  const { newPopup, setPopups } = usePopupAlertContext()

  function createPrice() {
    newPopup({
      title: <NewPriceUI loadPrices={loadPrices} newPopup={newPopup} setPopups={setPopups} />,
      subTitle: '',
      action: [],
    })
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-full px-4'>
      <TapMotion
        size='lg'
        className='halka-bg flex h-36 w-36 flex-none cursor-pointer items-center justify-center rounded-full'
        onClick={createPrice}
      >
        <PlusIcon className='h-7 w-7 rounded-lg opacity-80' />
      </TapMotion>
      <p className='text-sm font-medium'>New Price</p>
    </div>
  )
}

function NewPriceUI({ loadPrices, newPopup, setPopups }: { loadPrices: () => void; newPopup: NewPopupFn; setPopups: SetPopupsFn }) {
  const [price, setPrice] = useState('')
  const [coins, setCoins] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function createPrice() {
    const coin_num = Number(coins)
    const price_num = Number(price)
    if (!coin_num || !price_num) return alert('Invalid input')
    setIsLoading(true)
    const res = await create_price_f(coin_num, price_num)
    if (!res.status) return alert(res.message)
    loadPrices()
    setIsLoading(false)
    newPopup({ title: 'Success', subTitle: 'Price created successfully' })
  }

  return (
    <div className='flex flex-col gap-4'>
      <img src='/AppIcons/full.svg' className='border-color/20 bg-color/20 mx-auto aspect-square w-1/2 rounded-full border p-7' alt='' />
      <Input placeholder='Trapp Coins' className='mt-5' type='number' value={coins} onChange={(e) => setCoins(e.target.value)} />
      <Input placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
      <Button className='mt-2' onClick={createPrice} disabled={isLoading || !coins.trim() || !price.trim()}>
        {isLoading && <Loading />}
        {isLoading ? 'Creating Price' : 'Create Price'}
      </Button>
      <Button onClick={() => setPopups([])}>Cancel</Button>
    </div>
  )
}

export function PriceSkeleton() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 rounded-md px-4'>
      <div className='halka-bg h-36 w-36 animate-pulse rounded-full' />
      <p className='halka-bg h-4 w-3/5 animate-pulse rounded-sm'></p>
    </div>
  )
}
