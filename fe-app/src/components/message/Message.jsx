import React, { useEffect } from 'react'

function Message({ isError = false, isVisible, setIsVisible, message = ''}) {

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [isVisible, setIsVisible]);
    
    if (!isVisible) {
        return null;
    } else {
        return (
            <div className={`flex justify-center items-center
            border-solid border border-black fixed
            ${isError ? 'bg-red-500' : 'bg-green-200'}
            top-0 left-0 w-full h-20 z-50`}
            >
                <p className='font-bold text-3xl'>
                    {message}
                </p>
            </div>
        );
    }
}

export default Message;
