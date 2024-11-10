import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { SignIn, SignInButton, SignedOut, UserButton } from '@clerk/nextjs'

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-blue-800 p-2">
            <Link href={'/'}>Scheduler</Link>
            <div>
                <Button className='mx-1' >
                    <Link href={'/create'}>Create event</Link>
                </Button>

                <SignedOut>{/* this will only render when user is not loged in */}
                    <SignInButton forceRedirectUrl='/dashboard'> 
                        <Button className='mx-1'>Login</Button>
                    </SignInButton>
                </SignedOut>

                <SignIn> {/* this will only render when user is loged in */}
                    <UserButton />
                    <Button className='mx-1'>
                        <Link href={'/sign-up'}>Sign up</Link>
                    </Button>
                </SignIn>
            </div>
        </div>
    )
}

export default Header