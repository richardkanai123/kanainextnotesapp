'use client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { GetCategoryEmoji } from "@/lib/utils"


const NoteBadge = ({ note_Category }: { note_Category: string }) => {
    const emoji = GetCategoryEmoji(note_Category)
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Badge className="w-8 h-8 flex items-center align-middle justify-center hover:bg-primary bg-background dark:invert delay-3000 hover:text-white" variant="outline">{emoji}</Badge>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{note_Category}

                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default NoteBadge