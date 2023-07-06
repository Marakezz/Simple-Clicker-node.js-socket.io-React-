import React from "react";
import { FiUsers } from 'react-icons/fi';
import { BiLogOut} from 'react-icons/bi';


function RoomDetails({
    users,
    userName,
    onExitFromRoom,
}) {

    return (
        <div
            className="
                flex
                flex-col
                border-r-2
                border-gray-100
                w-full
                md:w-1/4
                lg:w-1/5
                h-auto
                md:h-screen
            "
        >   

            {/* Room Details */}
            <div
                className="
                    border-b-2
                    border-gray-100
                    w-full
                    p-2
                    flex
                    flex-row
                    justify-between
                    align-middle
                "
            > 
                <div className="flex flex-col gap-0 w-4/5 md:w-auto truncate md:break-words">
                    <div className="flex flex-row gap-3">
                        <div className="flex flex-row gap-1 text-neutral-600 justify-center">
                            <FiUsers size={18} className="inline-block my-auto"/> <span className="inline-block text-base font-semibold align-middle">{users.length}</span>
                        </div>

                    </div>
                </div>
                <button
                    onClick={onExitFromRoom}
                    className="
                        rounded
                        bg-rose-50
                        hover:bg-rose-100
                        text-rose-500
                        text-base
                        font-semibold
                        w-12
                        h-12
                        p-2
                        py-auto
                        flex
                        md:hidden
                        justify-center
                    "
                >
                    <BiLogOut size={22} className="inline-block my-auto"/>
                </button>
            </div>

            {/* Players list */}
            <div
                className="
                    hidden
                    border-b-2
                    border-gray-100
                    w-full
                    md:flex
                    flex-col
                    p-2
                    px-1
                    gap-1
                    h-full
                    overflow-y-auto
                "
            >
                <div
                    className="
                        text-neutral-600
                        text-sm
                        font-semibold
                        px-1
                    "
                >
                    Список игроков
                </div>
                <div className="flex flex-col">
                    {users.map((user, index) =>
                        <div 
                            className="
                                flex
                                flex-row
                                justify-between
                                align-middle
                                bg-white
                                hover:bg-neutral-100
                                rounded
                                p-1
                                transition
                            " 
                            key={user.userName + index}>
                                <div
                                    className="
                                        flex
                                        flex-row
                                        gap-1
                                    " 
                                >
                                    {
                                        <>
                                            <span className="font-bold">{index+1 + ') '}</span>
                                           {
                                                (user.userName === userName) ? <span className="text-base font-bold text-red-600 underline">{'(ME) ' + user.userName}</span> : (
                                                    (user.status === 'online') ? <span className="text-base font-semibold text-blue-500 underline">{user.userName}</span>
                                                     : <span className="text-base font-semibold text-black underline">{user.userName}</span>
                                                )
                                                    
                                           } 
                                        <span className="text-base font-bold text-lime-600">Points: {user.points}</span>
                                        </>
                                    }
                                    

                                </div>
            
                                


                        </div>
                    )}
                </div>
            </div>

            {/* Bottom */}
            <div
                className="
                    hidden
                    border-b-2
                    border-gray-100
                    w-full
                    md:flex
                    flex-row
                    justify-center
                    p-2
                "
            >
                <button
                    onClick={onExitFromRoom}
                    className="
                        rounded
                        bg-rose-50
                        hover:bg-rose-100
                        text-rose-500
                        text-base
                        font-semibold
                        w-full
                        p-2
                        flex
                        flex-row
                        justify-center
                        gap-1
                    "
                >
                    <BiLogOut size={22} className="inline-block my-auto"/>
                    <span className="inline-block align-center">Выход</span> 
                </button>
            </div>
                
        </div>
    )
}

export default RoomDetails;