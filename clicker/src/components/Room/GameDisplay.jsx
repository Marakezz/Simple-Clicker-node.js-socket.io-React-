import React from "react";
import axios from 'axios';
import socket from "../../socket";

function GameDisplay({id}) {

    const buttonClicked = async () => {
        const obj = {
            id
        }
        await axios.post('/buttonClicked', obj);
        socket.emit('BUTTON:CLICKED');
    }
    return( 
        <div 
            className="
                w-full
                md:w-2/4
                lg:w-3/5
                flex
                flex-row
                bg-neutral-50
                h-1/2
                md:h-[600px]
            "
        >
            <button className="
                bg-sky-500 hover:bg-sky-700 border-8 w-72 h-72 rounded-full font-bold text-xl m-auto 
            "
            onClick={buttonClicked}
            >CLick me</button>
        </div>
    )
}

export default GameDisplay;