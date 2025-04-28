import axios from "axios";
import { useState } from "react";

function App() {
  const [images, setImages] = useState([]);

  const chargerImage = () => {
    axios.get(`https://picsum.photos/200/300`, {responseType:'blob'}).then((res) => {
      const imageUrl = URL.createObjectURL(res.data);
      setImages(imageUrl);
    });
  };

  return (
    <div className="flex bg-red-200 justify-center w-1/2">
      <button onClick={chargerImage}>Charger image</button>
      <img src={images} alt="imageRandom" />
    </div>
  );
}

export default App;
