import { useCallback, useEffect } from 'react'
import { usePopupAlertContext } from '../context/PopupAlertContext'
import transitions from '../lib/transition'

export default function PopupAlert() {
  const { popups, setPopups } = usePopupAlertContext()

  useEffect(() => {
    if (popups.length) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [popups])

  // Disable back button
  useEffect(() => {
    const disableBackButton = (e: any) => {
      e.preventDefault()
      e.stopPropagation()
    }
    window.addEventListener('popstate', disableBackButton)
    return () => {
      window.removeEventListener('popstate', disableBackButton)
    }
  }, [popups])

  // Remove the last popup
  const removePopup = useCallback(() => {
    const old = [...popups]
    old.pop()
    setPopups(old)
  }, [popups])

  const popup = popups[popups.length - 1]

  if (!popups.length) return null
  return (
    <div className='fixed z-[100] flex h-screen w-full select-none items-center justify-center '>
      <div className='w-[85%] max-w-sm rounded-xl border border-white/10 bg-white/90 shadow-[0px_0px_100vh_100dvh_#00000075,0_0_10px_10px_#00000005] backdrop-blur-lg dark:bg-neutral-900/80'>
        <div className='p-6 pb-0'>
          <div className='text-md font-normMid font-medium'>{popup.title}</div>
          <div className='mt-2 text-sm font-[450]'>{popup.subTitle}</div>
        </div>
        <div className='flex items-center justify-between gap-3.5 p-4 text-[0.8rem]'>
          {popup.action?.map((action, index) => (
            <button
              key={index}
              className={
                action.className +
                'highlight-none tap97 font-normMid w-full flex-grow rounded-lg  bg-black/5 py-3.5 dark:bg-white/5'
              }
              onClick={() => {
                transitions(removePopup, 0)()
                action.onClick && action.onClick()
              }}
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog'
// import { Button } from '@/components/ui/button'

// export default function AlertDialogDemo() {
//   const { popups, setPopups } = usePopupAlertContext()
//   useEffect(() => {
//     if (popups.length) document.body.style.overflow = 'hidden'
//     return () => {
//       document.body.style.overflow = 'auto'
//     }
//   }, [popups])

//   // Disable back button
//   useEffect(() => {
//     const disableBackButton = (e: any) => {
//       e.preventDefault()
//       e.stopPropagation()
//     }
//     window.addEventListener('popstate', disableBackButton)
//     return () => {
//       window.removeEventListener('popstate', disableBackButton)
//     }
//   }, [popups])

//   // Remove the last popup
//   const removePopup = useCallback(() => {
//     const old = [...popups]
//     old.pop()
//     setPopups(old)
//   }, [popups])

//   const popup = popups[popups.length - 1]

//   if (!popups.length) return null
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>{/* <Button variant='outline'>{popup.title}</Button> */}</AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>{popup.title}</AlertDialogTitle>
//           <AlertDialogDescription>{popup.subTitle}</AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction>Continue</AlertDialogAction>
//           <div className='flex items-center justify-between gap-3.5 p-4 text-[0.8rem]'>
//             {popup.action?.map((action, index) => (
//               <button
//                 key={index}
//                 className={
//                   action.className + ' highlight-none tap97 font-normMid w-full flex-grow rounded-lg bg-white/5 py-3.5'
//                 }
//                 onClick={() => {
//                   transitions(removePopup, 0)()
//                   action.onClick && action.onClick()
//                 }}
//               >
//                 {action.text}
//               </button>
//             ))}
//           </div>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }
