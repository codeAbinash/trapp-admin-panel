import Sidebar from '@/components/Sidebar'

export default function Home() {
  return (
    <div className='gradient'>
      <Sidebar show />
      <div className='min-h-[100dvh] w-full translate-x-0 p-10 xl:w-[calc(100%-18rem)] xl:translate-x-72'>
        <h1 className='text-2xl font-semibold'>Hello World</h1>
        <h1 className='text-5xl'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam ipsum qui quis velit molestiae ab ducimus,
          inventore nam animi deleniti? Vel officiis nobis eius velit, similique sapiente sint architecto! Tempore,
          earum odit, fuga consequuntur est, optio veritatis nemo ut officia consectetur dolores molestiae pariatur
          molestias suscipit! Numquam nihil ducimus doloribus?
        </h1>
      </div>
    </div>
  )
}
