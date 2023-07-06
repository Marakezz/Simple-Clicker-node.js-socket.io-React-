import io from 'socket.io-client';


// const socket = io('http://localhost:9999'); //по умолчанию будет пытаться подключиться к порту 3000, но тут просто реакт приложение, а нод с сокетами находится на 9999
const socket = io();

export default socket;