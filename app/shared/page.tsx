const SharedNotesPage = ({ children }: {
    children: React.ReactNode
}) => {

    return (
        <div className='w-full p-2'>
            <h1>Your Shared Notes</h1>
            {children}
        </div>
    )
}

export default SharedNotesPage