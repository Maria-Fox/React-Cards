import React, {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";


const Deck = () => {

  let [deckId, setDeckId] = useState(null);
  let [deckOfCards, setDeckOfCards ] = useState([]);
  let [cardCount, setCardCount ] = useState(0);
  let newDeckUrl = "https://deckofcardsapi.com/api/deck/new/";
  let drawCardUrl = `https://deckofcardsapi.com/api/deck`;

  useEffect(function drawDeck () {
    async function getDeckId () {

      try {
        const res = await axios.get(`${newDeckUrl}/shuffle/`);
        let deckId = res.data.deck_id
        setDeckId(deckId);
  
        console.log("deck id is: ", deckId)
      } catch (e) {
        console.log(e);
      }
    };

    getDeckId();
  }, [])

  async function drawCard ( theDeckId ) {
    try {
      let res = await axios.get(`${drawCardUrl}/${theDeckId}/draw/?count=1`)
      // console.log(res);
      let newCard = res.data.cards[0].image;
      // console.log(newCard)
      setDeckOfCards(cards => [...cards, newCard]);
      // console.log(deckOfCards);
      setCardCount(cardCount => cardCount +1);

    } catch (e) {
      console.log(e);
    }


  if(cardCount === 52) {
    return alert("No cards remaining!");
  };
};

  return (
    <div>
      {/* {deckId} */}
      <button className = "Deck-button" onClick = {() => drawCard(deckId)} > { {deckId} ? "Draw Card" : "Start Game"} </button>

      <div>
      {deckOfCards.map(cardImg => {
        return (
          < Card cardImg = {cardImg} key = {cardImg} />
        )
      }
      )}
      </div>


    </div>
  )
}

export default Deck;