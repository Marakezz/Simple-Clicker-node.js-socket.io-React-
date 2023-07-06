import './App.css';
import React from 'react';
import socket from './socket';
import JoinBlock from './components/JoinBlock';
import RoomDetails from './components/Room/RoomDetails';
import reducer from './reducer';
import axios from 'axios';
import GameDisplay from './components/Room/GameDisplay';


function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    userName: null,
    points: null,
    id: null,
    users: [],
  });

  const setUsers = (users) => {
    // console.log('новый пользователь', users); //Те самые 4 уведомления
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
}

React.useEffect( () => {
  socket.on('ROOM:SET_USERS', setUsers);

return() => { 
 
  socket.off('ROOM:SET_USERS', setUsers);
 } 
}, []);

  const onLogin = async (obj, id) => {
    dispatch({
      type: 'JOINED',
      payload: {
        obj,
        id
      }
    });
    socket.emit('ROOM:JOIN', obj, id);
    // const {data} = await axios.get(`/rooms/${obj.roomName}`); 
    const {data} = await axios.get(`/users`); 
    // console.log(data + 'LALAL');
    dispatch({ 
      type: 'SET_DATA',
      payload: data
    })
  };

  const onExitFromRoom = () => {
    dispatch({
      type: 'UNJOINED',
    })
    socket.disconnect();
  }

  return (
<div className='wrapper'>
  {!state.joined ? (<JoinBlock onLogin={onLogin}/>) : (
     <div 
      className='
        flex 
        flex-col
        md:flex-row
        h-screen
      '
     >
      <RoomDetails {...state} onExitFromRoom={onExitFromRoom}/>
      <GameDisplay {...state} />
     </div>
  )}
  
  
</div>

  );
}

export default App;
