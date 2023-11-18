import TextEmoji from '@/components/TextEmoji'

function Dashboard() {
  return (
    <>
      <Cards />
    </>
  )
}

function Cards() {
  return (
    <div className='space-y-4 px-2'>
      <div>
        <p className='text-2xl font-bold'>
          Hi, Welcome back <TextEmoji emoji='👋' />
        </p>
      </div>
      <div className='flex flex-wrap gap-5  pt-5'>
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_users.png'
          count='714K'
          title='Total Users'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png'
          count='1.35K'
          title='Total Creators'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_buy.png'
          count='12K'
          title='Total Videos'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_message.png'
          count='2K'
          title='Total Live'
        />
      </div>
      <div>{/* <img src='./AppIcons/square.svg' alt='' /> */}</div>
    </div>
  )
}
function CardCount({ count = '0', title = 'text', icon = '' }: { count?: string; title?: string; icon?: string }) {
  return (
    <div className='flex h-28 w-[100%] items-center gap-4 rounded-2xl bg-black/5 p-5 dark:bg-white/5 sm:w-[48%] lg:w-[23%] '>
      <div>
        <img src={icon} alt='' className='h-16' />
      </div>
      <div>
        <div className='text-2xl font-semibold'>{count}</div>
        <div className='text-sm font-medium opacity-70'>{title}</div>
      </div>
    </div>
  )
}

export default Dashboard
