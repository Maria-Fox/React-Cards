import React from "react";

const Card = ({cardImg}) => {
  return (
    <img src={cardImg} alt="deck img" key = {cardImg} />
  )
}

export default Card;