export function Loading({ text }: { text?: string }) {
  return (
    <div className='screen flex items-center justify-center gap-3'>
      <img src='/icons/other/loading.svg' className='w-[1.15rem] invert' />
      <p>{text}</p>
    </div>
  )
}

export function LoadingButton({ text = '' }: { text?: string }) {
  return (
    <div className='screen flex items-center justify-center gap-3 py-[1.07rem]'>
      <img src='/icons/other/loading.svg' className='w-4.5 invert' />
      <p className='text-xs'>{text}</p>
    </div>
  )
}
