import { useMemo } from 'react';
import './App.css';
import { Render } from './containers';
import { useAppSelector } from './hooks/redux';
import * as helper from './utils/helpers';

function App() {
  const store = useAppSelector(state => state.sate);
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
