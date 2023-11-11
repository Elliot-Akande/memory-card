import { useEffect, useState } from "react";

function Card({ id, handleClick }) {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchPokemon(id).then(setData);
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
    <button onClick={handleClick}>
      <img src={data.img ?? ""} alt={data.name ?? ""} />
      <p>{data.name ?? "Loading"}</p>
    </button>
  );
}

export default Card;
