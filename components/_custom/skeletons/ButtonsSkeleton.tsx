import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const ButtonsSkeleton = () => {
    return (
        <div className='w-full flex align-middle justify-center gap-2 mx-auto'>
            <div className="w-10 h-10 bg-slate-300 rounded-lg animate-pulse transition-all ease-in delay-100 flex align-middle items-center justify-center">
                <FaSpinner className="w-6 h-6 animate-spin " />
            </div>
            <div className="w-10 h-10 bg-slate-300 rounded-lg animate-pulse transition-all ease-in delay-150 flex align-middle items-center justify-center"> <FaSpinner className="w-6 h-6 animate-spin " /></div>
            <div className="w-10 h-10 bg-slate-300 rounded-lg animate-pulse transition-all ease-in delay-200 flex align-middle items-center justify-center"> <FaSpinner className="w-6 h-6 animate-spin " /></div>
            <div className="w-10 h-10 bg-slate-300 rounded-lg animate-pulse transition-all ease-in delay-300 flex align-middle items-center justify-center"> <FaSpinner className="w-6 h-6 animate-spin " /></div>
        </div>
    )
}

export default ButtonsSkeleton