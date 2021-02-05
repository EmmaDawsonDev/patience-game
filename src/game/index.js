let cardIdCounter = 0;
export default function generateDeck() {
  const suites = ["hearts", "diamonds", "clubs", "spades"];
  const deck = [];

  for (let suite of suites) {
    for (let i = 2; i <= 14; i++) {
      deck.push(createCard(suite, i));
    }
  }
  console.log(deck);
  return deck;
}

function createCard(suite, value) {
  return { id: cardIdCounter++, suite, value };
}

export function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}
