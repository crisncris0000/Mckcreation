import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";


const DropDownProfile = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const jwt = localStorage.getItem('jwt')

        if(jwt != null) {
            setUser(jwtDecode(jwt))
        }

    }, [])

    return (
        <div className='relative flex flex-col items-center rounded-lg z-10'>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className='flex items-center justify-between 
                font-bold text-lg
                tracking-wider borderr-4 border-transparent
                active:text-white'
            >
                {user ? `${user.firstName} ${user.lastName}` : null}
                {!isOpen ? (
                    <AiOutlineCaretUp />
                ) : (
                    <AiOutlineCaretDown />
                )}
            </button>

            {isOpen && (
                <div className='bg-white absolute top-8 flex flex-col items-start rounded-lg p-2 w-full'>
                    <div className='flex w-full justify-between hover:bg-blue-300 
                    cursor-pointer rounded-r-lg border-l-transparent
                    hover:border-l-white border-l-4
                    p-4'>
                        <h3>Settings</h3>
                    </div>
                    <div className='flex w-full justify-between hover:bg-blue-300 
                    cursor-pointer rounded-r-lg border-l-transparent
                    hover:border-l-white border-l-4
                    p-4'>
                        <h3>Logout</h3>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DropDownProfile