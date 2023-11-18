function Dashboard() {
  return (
    <div className='space-y-4 px-2'>
      <div>Hi, Welcome back 👋</div>
      <div className='flex flex-wrap gap-5 '>
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_bag.png'
          count='714K'
          title='Weekly Sales'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_users.png'
          count='1.35m'
          title='New Users'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_buy.png'
          count='1.72m'
          title='Item Orders'
        />
        <CardCount
          icon='https://minimal-kit-react.vercel.app/assets/icons/glass/ic_glass_message.png'
          count='234'
          title='Bug Reports'
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
        <div className='text-2xl font-medium'>{count}</div>
        <div className='text-sm opacity-70'>{title}</div>
      </div>
    </div>
  )
}

export default Dashboard
