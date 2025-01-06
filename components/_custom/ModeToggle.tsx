'use client'

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} variant="outline" size="icon" className="relative flex items-center justify-center">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>


    )
}
