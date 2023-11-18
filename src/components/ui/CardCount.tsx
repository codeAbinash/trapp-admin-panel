export default function CardCount({
  count = '0',
  title = 'text',
  icon = '',
}: {
  count?: string
  title?: string
  icon?: string
}) {
  return (
    <div className='flex h-28 w-[100%] items-center gap-4 rounded-2xl bg-white/5 p-5 sm:w-[48%] lg:w-[23%]'>
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
