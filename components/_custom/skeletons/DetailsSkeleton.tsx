import ButtonsSkeleton from "./ButtonsSkeleton"

export function DetailsSkeleton() {
    return (
        <div className="w-full flex flex-col justify-around space-y-6 m-auto self-center bg-slate-500 dark:bg-slate-950">
            <div className="w-full rounded flex text-sm align-middle justify-between text-gray-500 dark:bg-gray-200 text-left h-20 aspect-video animate-pulse ">
                <div className="bg-opacity-45 h-full w-[200px] bg-slate-700"></div>
                <div className="bg-opacity-45 h-full w-[200px] bg-slate-700"></div>
            </div>

            <div className="w-full rounded flex flex-col text-sm text-gray-500 dark:bg-gray-200 text-left h-20 aspect-video animate-pulse">

            </div>
            <div className="w-full rounded flex flex-col text-sm text-gray-500 dark:bg-gray-200 text-left h-20 aspect-video animate-pulse">

            </div>

            <div className="space-y-2">
                <ButtonsSkeleton />
            </div>
        </div>
    )
}
