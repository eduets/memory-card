export { Card };
import { useState, useEffect } from "react";
import { API_KEY } from "../scripts/api.js";

function Card({ name, id, handleClick }) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    fetchImg(API_KEY, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchImg(apiKey, imgId) {
    try {
      const fetchResponse = await fetch(
        `https://api.giphy.com/v1/gifs/${imgId}?api_key=${apiKey}`,
        {
          mode: "cors",
        }
      );
      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`);
      }
      const jsonResponse = await fetchResponse.json();
      if (
        jsonResponse.data !== undefined &&
        jsonResponse.data.images &&
        jsonResponse.data.images.original !== undefined &&
        jsonResponse.data.images.original.url !== undefined
      ) {
        setImgUrl(jsonResponse.data.images.original.url);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (_error) {
      console.error(_error);
      setImgUrl("");
    }
  }

  return (
    <button
      className={`card ${imgUrl !== "" ? "card-cover" : "card-error"}`}
      onClick={() => {
        handleClick(id);
      }}
      style={imgUrl !== "" ? { backgroundImage: `url("${imgUrl}")` } : {}}
    >
      <div className="name">{name}</div>
    </button>
  );
}
