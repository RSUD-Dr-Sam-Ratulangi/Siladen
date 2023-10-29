import {io} from 'socket.io-client';
import {API_HOST} from '../config';

let socket: any;

const defineSocket = () => {
  socket = io(API_HOST);
};

export {socket, defineSocket};
