'use client'
import { Button } from '@/components/ui/button'
/*************  ✨ Codeium Command ⭐  *************/
/**
 * SuccessPage is a page that displays a success message after a note has been created
 * This page is client-side rendered because it needs to access the router's query string
 * to get the id of the note that was just created
 * @returns A success message with a link to the note that was created
 */
/******  41bf4140-1920-408f-b7e1-7bd40f37dc01  *******/
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaHome } from 'react-icons/fa'
import { IoAddCircle } from 'react-icons/io5'

const SuccessPage = () => {

    const Router = useRouter()

    return (
        <div className="w-full flex flex-col items-center justify-center h-screen gap-2">
            <h1 className="text-2xl text-lime-500 font-semibold">Success</h1>
            <Image src="/success.jpg" alt="Success" width={200} height={200} />
            <p className="text-sm text-lime-500">Your note has been created</p>

            <div className="w-full mx-auto flex align-middle items-center justify-center gap-4 p-2">
                <Button variant='default' onClick={() => Router.replace(`/create`)} >
                    <IoAddCircle className='w-6 h-6' />
                    <span className='ml-1'>
                        Add More Notes
                    </span>
                </Button>
                <Button variant='secondary' onClick={() => Router.replace(`/`)} >
                    <FaHome className='w-6 h-6' />
                    <span className='ml-1'>Go Home</span>
                </Button>

            </div>

        </div>
    )
}

export default SuccessPage