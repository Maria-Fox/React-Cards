import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";

// for each render/ card there is a newInterval being set. That timer needs to be cleared at the dismount/ effect clearing. Then, a new one is created for each render.


const AutoDeck = () => {

  let [deckId, setDeckId] = useState(null);
  let [deckOfCards, setDeckOfCards ] = useState([]);
  let [cardCount, setCardCount ] = useState(0);
  let [autoDraw, setAutoDraw] = useState(false);

  let newDeckUrl = "https://deckofcardsapi.com/api/deck/new/";
  let drawCardUrl = `https://deckofcardsapi.com/api/deck`;
  const timeRef = useRef();

  useEffect(function drawDeck () {
    async function getDeckId () {

        try {
          const res = await axios.get(`${newDeckUrl}/shuffle/`);
          let deckId = res.data.deck_id
          setDeckId(deckId);
    
          // console.log("deck id is: ", deckId)
        } catch (e) {
          alert(e);
        }
      };

    getDeckId();
  }, []);


  useEffect(function setTimer() {
  

    if( autoDraw ){
      timeRef.current = setInterval(async function getCards () {
        try {
          let res = await axios.get(`${drawCardUrl}/${deckId}/draw/?count=1`)
            let newCard = res.data.cards[0].image;
            setDeckOfCards(cards => [...cards, newCard]);
            setCardCount(cardCount => cardCount +1);
        } catch (e) {
          setAutoDraw(false);
        }
      }, 1000);
    }

    return function stopAutoDeck () {
        // console.log("timeref in clean up", timeRef);
        clearInterval(timeRef.current);

        if(cardCount === 52){
          setAutoDraw(false);
          clearInterval(timeRef.current);
          return alert("~Out of cards~")
        }
        // timeRef.current = null;
        // return alert ("Out of cards!")
    } 
  }, [autoDraw, cardCount, deckOfCards]);


  return (
    <div>
      <button className = "Deck-button"  onClick = {() => setAutoDraw(!autoDraw)} > { autoDraw === false ? "Draw for me!" : "Stop drawing!"} </button>

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

export default AutoDeck;