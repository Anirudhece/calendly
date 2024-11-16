import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { SignedIn, SignInButton, SignedOut, UserButton } from '@clerk/nextjs'

const Header = () => {
    return (
        <div className="flex justify-between items-center bg-blue-800 p-2">
            <Link href={'/'}>Scheduler</Link>
            <div className='flex space-x-3'>
                <Button >
                    <Link href={'/create'}>Create event</Link>
                </Button>

                <SignedOut>{/* this will only render when user is not loged in */}
                    <SignInButton forceRedirectUrl='/dashboard'>
                        <Button>Login</Button>
                    </SignInButton>
                </SignedOut>

                <SignedIn >{/* this will only render when user is loged in */}
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}

export default Header