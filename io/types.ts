import socket from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

export type Socket =socket.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
export type Io = socket.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>