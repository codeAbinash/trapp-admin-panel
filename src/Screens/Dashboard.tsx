import CardCount from '@/components/ui/CardCount'
import React from 'react'

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

export default Dashboard
