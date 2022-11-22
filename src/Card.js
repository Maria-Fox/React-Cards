import React from "react";

const Card = ({image, cardImg}) => {
  return (
      <img src={cardImg} alt="deck img" key = {cardImg} />
      // <img src = {image}/>


  )
}

export default Card;