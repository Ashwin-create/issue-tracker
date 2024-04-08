'use client';

import { Avatar, Flex } from '@radix-ui/themes';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { FaReact } from "react-icons/fa";

const NavBar = () => {
  const currentPath = usePathname(); //return the current path
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><FaReact /></Link>
        <div className="text-2xl">issue-tracker</div>
        <div className='flex-grow'></div>
        <ul className='flex space-x-6'>
            <li><Link className='text-zinc-500 hover:text-zinc-800 transition-colors text-xl' href='/'>Dashboard</Link></li>
            <li className=''><Link className='text-zinc-500 hover:text-zinc-800 transition-colors text-xl' href='/issues'>Issues</Link></li>
        </ul>
        <div className='ml-auto'>
          <Flex gap="2">
            <Avatar fallback="A" />
          </Flex>
        </div>
    </nav>
  )
}

export default NavBar