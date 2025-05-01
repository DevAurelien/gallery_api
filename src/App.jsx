import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [images, setImages] = useState([]);

  const chargerImage = () => {
    axios
      .get(`https://picsum.photos/200/300`, { responseType: "blob" })
      .then((res) => {
        const imageUrl = URL.createObjectURL(res.data);
        setImages((prev) => [...prev, imageUrl]);
      });
  };

  useEffect(() => {
    Array(6)
      .fill()
      .forEach(() => chargerImage());
      setImages((prev) => {
      const newImages = [...prev]; 
      if (newImages.length > 0) {
        newImages[0] = (
          <div
            style={{
              width: "200px",
              height: "150px",
              backgroundColor: "black",
            }}
          >
          </div>
        );
      }
      return newImages; 
    });
  }, [images]);

  useEffect(() => {
    const appli = document.getElementById("appli");
    const handleScroll = () => {
      const scrollPosition = appli.scrollTop;
      const windowHeight = appli.clientHeight;
      const totalHeight = appli.scrollHeight;


      const margin = 10;
      if (scrollPosition + windowHeight >= totalHeight - margin) {
        Array(6)
          .fill()
          .forEach(() => chargerImage());
      }
    };

    appli.addEventListener("scroll", handleScroll);

    return () => {
      appli.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="appli"
      className="flex flex-col h-full text-white items-center gap-4 w-full py-4 overflow-y-scroll"
    >
      
      {/* <button
        className="bg-zinc-500 border-2 border-black m-4 w-1/5"
        onClick={chargerImage}
      >
        Charger image
      </button> */}
      <div className="flex gap-4 justify-center w-full ">
        <div className="flex flex-wrap gap-4 justify-center w-1/2 ">
        {images.map((image, index) => {
          return typeof image === "string" ? (
            <img
              key={index}
              src={image}
              alt={`Image aléatoire ${index}`}
              className={`w-1/3 shadow-2xl border-1 hover:scale-105 ${index % 2 === 0 ? '-mt-40 mb-40' : 'mt-0'} `}
            />
          ) : (
            <div
              key={index}
              style={{
                width: "200px",
                height: "150px",
                backgroundColor: "transparent",
                margin:"4px",
              }}
              className="flex flex-wrap w-1/3 gap-4"
            ><h1 className="text-4xl my-6">Gallerie Api</h1>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default App;
