'use client'
// error component
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from "next-themes";

const ErrorComponent = () => {
    const { theme } = useTheme()
    const router = useRouter();
    useEffect(() => {
        toast.error('Something went wrong! Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme
        });
        setTimeout(() => {
            router.push('/');
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);
    return (

        <div className='w-full flex flex-col' >
            <h1 className="text-2xl font-semibold mb-2 ">Note Not Found</h1>
            <p className="text-sm text-red-200">
                Something went wrong!
            </p>
            <p>Refresh the page or try again later </p>
        </div>
    )
}

export default ErrorComponent