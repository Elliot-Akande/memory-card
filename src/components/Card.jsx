import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import "/src/styles/Card.css";

function Card({ id, handleClick }) {
  const [data, setData] = useState({ name: "Loading..." });

  useEffect(() => {
    const formatName = (name) => {
      return name
        .replaceAll(/-/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    fetchPokemon(id).then((result) => {
      setData({ ...result, name: formatName(result.name) });
    });
  }, [id]);

  const fetchPokemon = async (imgId) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${imgId}/`);
    const data = await response.json();

    if (response.ok) {
      return {
        id: data.id,
        name: data.name,
        img: data.sprites.front_default,
      };
    }
  };

  return (
    <button onClick={handleClick} className="card">
      {data.img ? (
        <img src={data.img} alt={data.name} />
      ) : (
        <div className="loading-container">
          <RingLoader size={48} color="#5eead4" />
        </div>
      )}
      {data.name}
    </button>
  );
}

export default Card;
