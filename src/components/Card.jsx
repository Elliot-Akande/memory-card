function Card() {
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
    <>
      <p>This is a card</p>
    </>
  );
}

export default Card;
