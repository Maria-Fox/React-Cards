import logo from './logo.svg';
import './App.css';
import Deck from './Deck';
import AutoDeck from './AutoDeck';
import SolDeck from './SolDeck';

// Part 1 is an instance of Deck.
// Part 2 is an instance of AutoDeck.


function App() {
  return (
    <div className="App">
      <h1>React Cards</h1>
      <Deck />
      <AutoDeck />
      <SolDeck />
    </div>
  );
}

export default App;
