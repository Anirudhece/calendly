import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
const Header = () => {
    return (
        <div className="flex justify-between items-center bg-blue-800 p-2">
            <Link href={'/'}>Scheduler</Link>
            <div>
                <Button className='mx-1' >
                    <Link href={'/create'}>Create event</Link>
                </Button>
                <Button className='mx-1'>Login</Button>
            </div>
        </div>
    )
}

export default Header