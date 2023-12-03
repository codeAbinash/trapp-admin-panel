import { Loading } from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { app } from '@/constants'
import { usePopupAlertContext } from '@/context/PopupAlertContext'
import { add_creator_f, authorizedHeader, defaultHeaders } from '@/lib/api'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function NewCreator() {
  const [first_name, setFirst_name] = React.useState('')
  const [last_name, setLast_name] = React.useState('')
  // const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [pass1, setPass1] = React.useState('')
  // const [pass2, setPass2] = React.useState('')
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [channel_name, setChannel_name] = React.useState('')

  const { newPopup } = usePopupAlertContext()

  const navigate = useNavigate()

  async function handelSubmit() {
    const body: any = {}
    if (first_name) body['first_name'] = first_name
    if (last_name) body['last_name'] = last_name
    if (email) body['email'] = email
    if (pass1) body['password'] = pass1
    if (phone) body['phone'] = phone
    if (address) body['address'] = address
    if (channel_name) body['channel_name'] = channel_name

    setIsUpdating(true)
    const res = await add_creator_f(body)
    setIsUpdating(false)

    if (res.status) {
      newPopup({
        title: 'Success',
        subTitle: res.message,
        action: [{ text: 'Ok', onClick: () => navigate(-1) }],
      })
    } else {
      newPopup({
        title: 'Error',
        subTitle: res.message,
      })
    }
  }

  return (
    <div>
      <p className='mb-5 text-2xl font-bold'>New Creator</p>
      <div>
        <div className='dashed-border w-full max-w-[450px] rounded-xl  shadow-black/5'>
          <CardHeader className='pb-2'>
            <CardTitle className='flex w-full flex-col items-center justify-center gap-3 text-center text-2xl'>
              <p className=' w-full truncate text-xl font-bold'>New Creator Details</p>
            </CardTitle>
            <CardDescription className='font-medium'></CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='f-name'>First Name</Label>
              <Input
                id='f-name'
                placeholder='Enter first name'
                type='text'
                onChange={(e) => setFirst_name(e.target.value)}
                value={first_name}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='l-name'>Last Name</Label>
              <Input
                id='l-name'
                placeholder='Enter last name'
                type='text'
                onChange={(e) => setLast_name(e.target.value)}
                value={last_name}
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='channel_name'>Channel Name</Label>
              <Input
                id='channel_name'
                placeholder='Enter channel name'
                type='text'
                onChange={(e) => setChannel_name(e.target.value)}
                value={channel_name}
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='tel'>Contact Number</Label>
              <Input
                id='tel'
                placeholder='e.g. 9876543210'
                type='tel'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='email'>Contact Email</Label>
              <Input
                id='email'
                placeholder='e.g. helloworld@gmail.com'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='address'>Contact Address</Label>
              <Input
                id='address'
                placeholder='e.g. 123, Main Street, New York'
                type='text'
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='pass1'>Password</Label>
              <Input
                id='pass1'
                placeholder='Enter password'
                type='password'
                onChange={(e) => setPass1(e.target.value)}
                value={pass1}
              />
            </div>
            {/* <div className='space-y-1'>
              <Label htmlFor='pass2'>Confirm Password</Label>
              <Input
                id='pass2'
                placeholder='Confirm password'
                type='password'
                onChange={(e) => setPass2(e.target.value)}
                value={pass2}
              />
            </div> */}
          </CardContent>
          <CardFooter className='flex-col'>
            <Button className='w-full' size='lg' onClick={handelSubmit} disabled={isUpdating}>
              {isUpdating ? <Loading text='Updating...' invert='invert' /> : 'Create Creator'}
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  )
}

export default NewCreator
