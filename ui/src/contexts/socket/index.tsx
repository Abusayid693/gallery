import { ReactNode, createContext, useContext, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/dist/socket.io';
import { useAppDispatch } from '../../hooks/redux';
import { setStateData } from '../../store/state';
import { GET_ADDED_FILE, GET_DELETED_FILE_DATA, GET_UPDATED_FILE, LOAD_IMAGES } from "./constant";

const SERVER = 'http://localhost:5002';

export type SocketContextType = {
  navigation: string;
};

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

const SocketProvider: React.FC<{
  children: ReactNode;
}> = ({children}) => {
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.current = io(SERVER);

    socket.current.on('connect', () => {
      console.log(`socket io connected id: ${socket.current.id}`);
    });

    socket.current.on(LOAD_IMAGES, (data: any) => {
      console.log('load-iames :', data);
      dispatch(setStateData({images: data.d, imageFormats: data.imageFormats}));
    });

    socket.current.on(GET_UPDATED_FILE, data => {
      console.log('file-update :', data);
    });

    socket.current.on(GET_ADDED_FILE, data => {
      console.log('file-add :', data);
    });

    socket.current.on(GET_DELETED_FILE_DATA, data => {
      console.log('file-delete :', data);
    });
  }, []);

  const values = {
    navigation: ''
  };

  return <SocketContext.Provider value={values}>{children}</SocketContext.Provider>;
};

const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export { SocketProvider, useSocket };

