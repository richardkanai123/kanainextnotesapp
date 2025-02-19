'use client'
// error component
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';


const ErrorComponent = () => {
    const router = useRouter();
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(redirectTimer);
    }, [router]);

    return (
        <div className='w-full flex flex-col items-center justify-center p-8 space-y-4'>
            <h1 className="text-2xl font-semibold">Failed to Load Comments</h1>
            <div className="text-center space-y-2">
                <p className="text-red-500 dark:text-red-400">
                    No note Found
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    You will be redirected to the home page in 5 seconds.
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Return to Home
                </button>
            </div>
        </div>
    )
}

export default ErrorComponent