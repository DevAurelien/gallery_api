import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);

  const chargerImage = () => {
    axios
      .get(`https://picsum.photos/200/300`, { responseType: "blob" })
      .then((res) => {
        const imageUrl = URL.createObjectURL(res.data);
        setImages((prev) => [...prev, imageUrl]);
      });
  };

  useEffect(() => {
    const app = document.querySelector('#appli');
    const onScroll = () => setOffset(app.scrollTop);
    app.addEventListener("scroll", onScroll);
    return () => app.removeEventListener("scroll", onScroll);
  }, []);

  useEffect (()=>{
    console.log(offset);
    let hauteur = 100;
    if(offset > hauteur){
      console.log(hauteur);
      hauteur = hauteur + 100;
    }
  }, [offset])

  return (
    <div id="appli" className="flex flex-col h-full text-white p-4 items-center w-full overflow-auto">
      <h1 className="text-4xl">Gallery Api</h1>
      <button
        className="bg-zinc-500 border-2 border-black m-4 w-1/5"
        onClick={chargerImage}
      >
        Charger image
      </button>
      <div className="flex flex-wrap gap-4 justify-center w-1/2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image aléatoire ${index}`}
            className="w-1/3"
          />
        ))}
      </div>
    </div>
  );
}

export default App;
