'use client'
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export function CustomTrigger() {
    const { toggleSidebar } = useSidebar()

    return <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
}
