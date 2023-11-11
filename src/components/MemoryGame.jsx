import Card from "./Card";

function MemoryGame() {
  const numCards = 12;

  const cards = (numCards) => {
    const ids = [];
    // Generate unique pokemon ids in range 1 - 1017
    for (let i = 0; i < numCards; i++) {
      let id;
      do {
        id = Math.floor(Math.random() * 1017) + 1;
      } while (ids.includes(id));

      ids.push(id);
    }

    return ids.map((id) => <Card key={id} id={id} />);
  };

  return (
    <>
      <p>Memory Game Component</p>
      {cards(numCards)}
    </>
  );
}

export default MemoryGame;
