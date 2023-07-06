import React from 'react';
import axios from 'axios';
import socket from '../socket';



function JoinBlock({onLogin}) {
   
    const [userName, setUserName] = React.useState('');
    const [isLoading, setLoading] = React.useState(false);

    const onEnterToRoom = async () => {
        if(!userName){
            return alert('Неверные данные');
         }
         if (!socket.connected) {
            socket.connect();
        }
         const obj =  {
            userName, 
        }
         setLoading(true);
         await axios.post('/newUser', obj).then((res) => {
            if (res.data === 'Anavailable') {
                alert('Это имя недоступно в данный момент')
            } else {
                onLogin(obj, res.data);
            }
         })
         setLoading(false);       
    }


    return (
        <>
            <div>
                 <div>
                        <div className="join-block text-center border-double border-b-8 mt-4">
                            <input className='border-2 border-blue-300 rounded-md p-0.5 mr-10'
                                type="text" placeholder='Ваше имя' value={userName} onChange={e => setUserName(e.target.value)} />
                            <button disabled={isLoading} onClick={onEnterToRoom}
                                className='btn btn-success border-2 border-blue-300 rounded-md p-0.5' >
                                {isLoading ? 'Входим...' : 'Войти'}
                            </button>
                        </div>
                </div>
                    :

            </div>
        </>
    );
}

export default JoinBlock;