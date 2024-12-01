'use client'

import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { ChartNoAxesGantt } from 'lucide-react'

/**
 * UserMenu component displays the user's profile picture and a dropdown menu with options like "My Events", "Manage Account" and other default
 * @returns {JSX.Element} The UserMenu component.
 */
const UserMenu = () => {
    return (
        <div className='flex items-center'>
            <UserButton appearance={{ elements: { avatarBox: 'w-10 h-10 my-auto' } }}>
                <UserButton.MenuItems>
                    <UserButton.Link label='My Events' labelIcon={<ChartNoAxesGantt size={15} />} href='/events' />
                    <UserButton.Action label='manageAccount' />{/* if we want to change the order of the menu items do this way */}
                </UserButton.MenuItems>
            </UserButton>


        </div>
    )
}

export default UserMenu