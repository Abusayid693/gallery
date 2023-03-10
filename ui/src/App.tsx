import { useEffect, useMemo } from 'react';
import './App.css';
import { Render } from './containers';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { setStateData } from './store/state';
import * as helper from './utils/helpers';
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

    socket.on("file-add", data=>{
      console.log('file-add :', data);
    })

    socket.on("file-delete", data =>{
      console.log('file-delete :', data);
    })
  }, []);

  const images = useMemo(() => {
    return helper.getFormattedData();
  }, [store]);

  console.log('images :', store)

  return (
    <div className="App">
      <header className="App-header">
        <Render images={images} isGrouped={store.filteredImages.isGrouped} />
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
