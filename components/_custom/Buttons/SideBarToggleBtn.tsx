'use client'
import { Button } from '@/components/ui/button'
import { SidebarClose } from 'lucide-react'
import React, { useState } from 'react'


const SideBarToggleBtn = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Button variant='outline'>
            {
                isOpen ? <SidebarClose onClick={() => setIsOpen(false)} className="w-4 h-4 absolute right-0 p-2 text-primary" /> : <SidebarClose onClick={() => setIsOpen(true)} className="w-4 h-4 absolute right-0 p-2 text-primary" />
            }
        </Button>
    )
}

export default SideBarToggleBtn