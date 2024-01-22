import { setProfile, setProfileInfoLs } from '@/Redux/profile'
import store from '@/Redux/store'
import { useSelector } from 'react-redux'

import { Loading } from '@/components/Loading'
import TapMotion from '@/components/TapMotion'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePopupAlertContext } from '@/context/PopupAlertContext'
import API, { authorizedHeader, formDataHeaders, getError, get_profile_f } from '@/lib/api'
import transitions from '@/lib/transition'
import { UserProfile } from '@/lib/types'
import { delayFn, picFileValidation } from '@/lib/utils'
import { Pencil } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

function EditProfile() {
  return (
    <div>
      <p className='mb-5 text-2xl font-bold'>Edit Profile 🎨</p>
      <div className='flex flex-wrap gap-5'>
        <ChangePassword />
      </div>
    </div>
  )
}
function ProfilePicture({
  imageUrl,
  onImageClick,
}: {
  imageUrl?: string
  onImageClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}) {
  return (
    <div className='relative mx-auto mb-5 mt-2 max-w-lg'>
      <TapMotion size='lg' className='mx-auto w-32'>
        <img
          src={imageUrl}
          onClick={onImageClick}
          className='tap97 dashed-border profile-picture bg-inputBg mx-auto aspect-square w-full rounded-full border border-white/50 bg-white/10 object-cover shadow-xl'
        />
      </TapMotion>
      <TapMotion
        size='sm'
        onClick={onImageClick}
        className='tap95 anim-edit-icon edit-button absolute left-[60%] top-[75%] flex aspect-square h-11 w-11 items-center justify-center rounded-full bg-accent p-3 shadow-lg'
      >
        <Pencil className='w-10' />
        {/* <img src={icon('edit.svg')} className='invert' />0 */}
      </TapMotion>
    </div>
  )
}

type userUpdate = {
  name?: string
  email?: string
  profile_pic?: File
  password?: string
}
async function updateLocalUserData() {
  const userProfileData = await get_profile_f()
  if (userProfileData.status) {
    setProfileInfoLs(userProfileData.data.data)
    store.dispatch(setProfile(userProfileData.data.data as UserProfile))
  }
}
function ChangePassword() {
  const userProfile: UserProfile = useSelector((state: ReturnType<typeof store.getState>) => state.profile)
  const [name, setName] = useState(userProfile?.name || '')
  const [email, setEmail] = useState(userProfile?.email || '')
  const [profilePicture, setProfilePicture] = useState(userProfile?.profile_pic || '')
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)
  const { newPopup } = usePopupAlertContext()
  const pp = useRef<HTMLInputElement>(null)

  const onChangeFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileInput = e.target.files
      const ppValidation = picFileValidation(fileInput![0])
      if (ppValidation.error) return newPopup({ title: 'Invalid File', subTitle: ppValidation.message })
      setProfilePicture(URL.createObjectURL(fileInput![0]))
    },
    [setProfilePicture, newPopup],
  )

  const handelSubmit = useCallback(
    transitions(async () => {
      setIsUpdating(true)

      // If pass1 and pass2 are not same
      if (pass1 !== pass2) {
        newPopup({ title: 'Password Mismatch', subTitle: 'Passwords are not same.' })
        setIsUpdating(false)
        return
      }

      const body: any = {} as userUpdate
      if (name) body.name = name.trim()
      if (email) body.email = email.trim()
      if (pass1) body.password = pass1.trim()

      if (profilePicture !== userProfile?.profile_pic) {
        const ppValidation = picFileValidation(pp.current!.files![0])
        if (ppValidation.error) {
          newPopup({ title: 'Invalid File', subTitle: ppValidation.message })
          setIsUpdating(false)
          return
        }
        body.profile_pic = pp.current!.files![0]
      }

      const formData = new FormData()
      for (const key in body) formData.append(key, body[key]!)

      const res = await fetch(API.admin.update_profile, {
        method: 'POST',
        headers: authorizedHeader(formDataHeaders),
        body: formData,
      })

      console.log(body)
      const data = await res.json()
      console.log(data)
      if (data.status) {
        await updateLocalUserData()
        setIsUpdating(false)
        newPopup({
          title: 'Profile Updated',
          subTitle: 'Your profile has been updated successfully.',
        })
      } else {
        setIsUpdating(false)
        newPopup({ title: 'Error', subTitle: getError(data.errors) })
      }
    }),
    [name, email, profilePicture, isUpdating, pass1, pass2],
  )

  const loadProfile = useCallback(async () => {
    const res = await get_profile_f()
    if (!res.status) return
    const profileData = res.data.data as UserProfile
    setName(profileData?.name || '')
    setEmail(profileData?.email || '')
    setProfilePicture(profileData?.profile_pic || '')
  }, [])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  if (!userProfile) return <Loading text='Loading Profile...' />

  return (
    <div className='dashed-border w-full max-w-[450px] rounded-xl  shadow-black/5'>
      <CardHeader className='pb-2'>
        <CardTitle className='flex w-full flex-col items-center justify-center gap-3 text-center text-2xl'>
          <ProfilePicture imageUrl={profilePicture} onImageClick={delayFn(() => pp.current?.showPicker())} />
          <p className=' w-full truncate text-xl font-bold'>{name || 'Your Name'}</p>
        </CardTitle>
        <CardDescription className='font-medium'></CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <input type='file' className='hidden' ref={pp} onChange={onChangeFileSelect} accept='image/png, image/jpeg, image/jpg' />
        <div className='space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            placeholder='Enter your name'
            type='text'
            onChange={(e) => {
              setName(e.target.value)
            }}
            value={name}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            placeholder='adminemail@gmail.com'
            type='email'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value={email}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='pass1'>Password</Label>
          <Input
            id='pass1'
            placeholder='Enter your password'
            type='password'
            onChange={(e) => {
              setPass1(e.target.value)
            }}
            value={pass1}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='pass2'>Confirm Password</Label>
          <Input
            id='pass2'
            placeholder='Confirm your password'
            type='password'
            onChange={(e) => {
              setPass2(e.target.value)
            }}
            value={pass2}
          />
        </div>
      </CardContent>
      <CardFooter className='flex-col'>
        <Button className='w-full' size='lg' onClick={handelSubmit} disabled={isUpdating}>
          {isUpdating ? <Loading text='Updating...' invert='invert' /> : 'Update Profile'}
        </Button>
      </CardFooter>
    </div>
  )
}

export default EditProfile
