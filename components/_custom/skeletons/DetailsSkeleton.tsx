import { Card } from "@/components/ui/card"
import { FaSpinner } from "react-icons/fa"
import ButtonsSkeleton from "./ButtonsSkeleton"

export function DetailsSkeleton() {
    return (
        <div className="flex flex-col space-y-3 m-auto self-center">
            <Card className="w-full aspect-video rounded-md overflow-hidden relative flex-shrink-0 dark:bg-background animate-in transition-all ease-in ">
                <div className="absolute top-0 right-0  flex align-middle items-center gap-2">
                    <div className="w-10 h-10 bg-slate-300 rounded-lg animate-pulse transition-all ease-in delay-100"> <FaSpinner className="w-6 h-6 animate-spin " /></div>
                </div>
            </Card>
            <div className="space-y-2">
                <ButtonsSkeleton />
            </div>
        </div>
    )
}
