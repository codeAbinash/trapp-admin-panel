import { Loading } from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import React from 'react'

function NewCreator() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [pass1, setPass1] = React.useState('')
  const [pass2, setPass2] = React.useState('')
  const [isUpdating, setIsUpdating] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [payment, setPayment] = React.useState('')
  const pp = React.useRef<HTMLInputElement>(null)

  function handelSubmit() {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
    }, 1000)
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
              <Label htmlFor='name'>Full Name</Label>
              <Input
                id='name'
                placeholder='e.g. John Doe'
                type='text'
                onChange={(e) => {
                  setName(e.target.value)
                }}
                value={name}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='tel'>Contact Number</Label>
              <Input
                id='tel'
                placeholder='e.g. 9876543210'
                type='tel'
                onChange={(e) => {
                  setName(e.target.value)
                }}
                value={name}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='email'>Contact Email</Label>
              <Input
                id='email'
                placeholder='e.g. helloworld@gmail.com'
                type='email'
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                value={email}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='address'>Contact Address</Label>
              <Input
                id='address'
                placeholder='e.g. 123, Main Street, New York'
                type='text'
                onChange={(e) => {
                  setAddress(e.target.value)
                }}
                value={address}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='payment'>Payment Details(For Withdrawal)</Label>
              <Input
                id='payment'
                placeholder='Payment Details'
                type='text'
                onChange={(e) => {
                  setPayment(e.target.value)
                }}
                value={payment}
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='pass1'>Password</Label>
              <Input
                id='pass1'
                placeholder='Enter password'
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
                placeholder='Confirm password'
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
              {isUpdating ? <Loading text='Updating...' invert='invert' /> : 'Create Creator'}
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  )
}

export default NewCreator
