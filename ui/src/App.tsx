import { useEffect } from 'react';
import './App.css';
import { Render } from './containers/render';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { setStateData } from './store/state';
import * as io from './utils/io';

function App() {
  const dispatch = useAppDispatch();
  const store = useAppSelector(state => state.sate);

  useEffect(() => {
    const socket = io.connectWithSocketIOServer();

    socket.on('load-images', (data: any) => {
      console.log('load-iames :', data);
      dispatch(setStateData({images: data.d, imageFormats: data.imageFormats}));
    });

    socket.on('file-update', data => {
      console.log('file-update :', data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Render images={store.images} />
        {/* {images?.map((image:any, index) => {
          if (image?.type === "svg") {
            return (
              <img
              key={index}
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  image?.buffer
                )}`}
              />
            );
          }
          else if(image?.type === "png"){
            return (
              <img key={index} src={`data:image/png;base64,${image?.buffer}`}/>
            )
          }
        })} */}
        <p>Hello</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
