import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import * as io from "./utils/io";
import {Render} from "./containers/render"

function App() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const socket = io.connectWithSocketIOServer();

    socket.on("load-images", (data:any) => {
      console.log("load-iames :", data);
      setImages(data.d);
    });
  }, []);
 
  return (
    <div className="App">
      <header className="App-header">
        <Render images={images}/>
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
