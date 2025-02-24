const SharedNotesSkeleton = () => {
    return (
        < div className='bg-accent w-full md:max-w-[500px] p-2 mx-auto rounded-full overflow-hidden transition-all duration-200 ease-in hover:bg-background hover:shadow-lg animate-pulse delay-100 ' >
            <div className="w-full flex align-middle items-center gap-4">
                <div className="w-10 h-10 border rounded-full overflow-hidden relative object-cover flex flex-col justify-center items-center bg-gray-300 animate-pulse delay-500">
                    {/* Placeholder for avatar */}
                </div>
                <div className="flex-1 flex flex-col pr-2 animate-pulse">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
        </div >
    )
}

export default SharedNotesSkeleton


