import TextEmoji from '@/components/TextEmoji'
import { ModeToggle } from '@/components/mode-toggle.tsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function TabsDemo() {
  return (
    <Tabs defaultValue='creator' className='-mt-20 w-[95%] max-w-[450px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='creator'>Creator</TabsTrigger>
        <TabsTrigger value='admin'>Admin</TabsTrigger>
      </TabsList>
      <TabsContent value='creator'>
        <Creator />
      </TabsContent>
      <TabsContent value='admin'>
        <Admin />
      </TabsContent>
    </Tabs>
  )
}

function Header() {
  return (
    <div className='fixed top-0 w-full border border-transparent backdrop-blur-lg '>
      <div className='mx-auto flex max-w-7xl flex-row items-center justify-between p-4 py-3'>
        <img src='/AppIcons/full.png' className='w-16' />
        <div className='flex gap-5'>
          <ModeToggle />
          {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
         </Avatar> */}
        </div>
      </div>
    </div>
  )
}

function Creator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>
          <span className='font-semibold'>
            Creator Login <TextEmoji emoji='🎨' />
          </span>
        </CardTitle>
        <CardDescription className='font-medium'>
          Hello! <TextEmoji emoji='👋' /> Please login with your email and password.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' placeholder='creatoremail@gmail.com' type='email' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' placeholder='Enter your password' type='password' />
        </div>
      </CardContent>
      <CardFooter className='flex-col'>
        {/* <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          theme="dark"
        /> */}
        <Button className='w-full' size='lg'>
          Log In
        </Button>
        <Button className='mt-3 w-full text-blue-500' variant='link'>
          Forget Password?
        </Button>
      </CardFooter>
    </Card>
  )
}

function onchange(val: any) {
  console.log(val)
}

function Admin() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>
          <span className='font-semibold'>
            Admin Login <TextEmoji emoji='😎' />
          </span>
        </CardTitle>
        <CardDescription className='font-medium'>
          Hello! <TextEmoji emoji='👋' /> Please login with your email and password.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' placeholder='adminemail@gmail.com' type='email' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' placeholder='Enter your password' type='password' />
        </div>
      </CardContent>
      <CardFooter className='flex-col'>
        {/* <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          theme="dark"
          onChange={onchange}
        /> */}
        <Button className='w-full' size='lg'>
          Log In
        </Button>
        <Button className='mt-3 w-full text-blue-500' variant='link'>
          Forget Password?
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Login() {
  return (
    <>
      <Header />
      <div className='flex min-h-[100dvh] flex-col items-center justify-center gap-5 bg-gradient-to-tr from-red-100 to-blue-100 pt-20 dark:from-red-950/40 dark:to-blue-950/40'>
        {/* <img src="AppIcons/full.png" className="w-44 -mt-16" /> */}
        <TabsDemo />
      </div>
    </>
  )
}
