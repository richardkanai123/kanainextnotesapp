'use client'
import Form from 'next/form'
import { Button } from '@/components/ui/button'
import { SearchIcon, XIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useRef } from 'react'
const SearchBar = () => {
    const { replace } = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const titleParams = searchParams.get('title') as string
    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const title = e.currentTarget.value
        const params = new URLSearchParams(searchParams)
        params.set('title', title)
        replace(`${pathname}?${params.toString()}`);
    }

    const inputRef = useRef(null)
    const formref = useRef<HTMLFormElement>(null)

    return (
        <Suspense fallback={<div className='w-full animate-pulse rounded p-2'>
            <div className='w-1/3 h-4 bg-slate-400 dark:bg-background rounded'></div>
        </div>}>
            <div className='sm:mb-4 md:mb-0'>
                <Form ref={formref} action="search" className='flex'>
                    <Input ref={inputRef} defaultValue={titleParams} onChange={handleSearch} placeholder="Search by title " className="w-full bg-opacity-85 bg-background" type="text" name="title" id="title" />
                    {
                        titleParams && <Button type='button' onClick={(e) => {
                            e.preventDefault()
                            const params = new URLSearchParams(searchParams)
                            params.set('title', '')
                            replace(`${pathname}?${params.toString()}`);
                            if (formref.current) formref.current.reset()

                        }} className='ml-2' variant='ghost'>
                            <XIcon className='w-4 h-4 animate-in animate-out transition-all ease-in-out' />
                        </Button>
                    }
                    <Button size='icon' variant="outline" className="ml-2" type="submit">
                        <SearchIcon className="w-4 h-4" />
                    </Button>
                </Form>
            </div>
        </Suspense>
    )
}

export default SearchBar