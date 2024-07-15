import { useState } from "react";
import Player from "./Components/Playerinfo.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx";
import { WINNING_COMBINATIONS } from "./Winning-combination.js";
import GameOver from "./Components/GameOver.jsx";
const PLAYERS={X:'Player 1',O:'Player 2'};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
function deriveActivePlayer(gameTurns)
{
  let currentPlayer='X';
  if(gameTurns.length > 0 && gameTurns[0].player==='X')
    {
      currentPlayer='O'
    }
    return currentPlayer;
}
function deriveGameBoard(gameTurns)
{
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];
  
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard,players)
{
  let winner;
  for(const combination of WINNING_COMBINATIONS)
    {
      const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
      if(firstSquareSymbol&&
        firstSquareSymbol===secondSquareSymbol&&
        firstSquareSymbol===thirdSquareSymbol)
        {
          winner=players[firstSquareSymbol];
        }
    }
    return winner;
}
function App() 
{
  const [players,setPlayers]=useState(PLAYERS)
  const [gameturns,setGameturns]=useState([]);
  const [hasWinner,setHasWinner]=useState(false);
  // const [actviePlayer,setActivePlayer]= useState('X');
  const activePlayer=deriveActivePlayer(gameturns);
  const gameBoard=deriveGameBoard(gameturns);
  const winner=deriveWinner(gameBoard,players);
  const hasDraw=gameturns.length === 9 && !winner;
 function handleSelectSqaure(rowIndex,colIndex)
 {
  //setActivePlayer((curActivePlayer)=>curActivePlayer==='X'?'O':'X');
  setGameturns(prevTurns=> {
   const currentPlayer=deriveActivePlayer(prevTurns);
    const updatedTurns=[
    {square:{row:rowIndex,col:colIndex},player:currentPlayer},
    ...prevTurns,];
  return updatedTurns;
  });
 }
 function handleRestart()
 {
  setGameturns([]);
 }
 function handlePlayerNameChange(symbol,newName)
 {
  setPlayers(prevPlayers => {
    return {
      ...prevPlayers,[symbol]:newName
    };
  });
 }
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialname={PLAYERS.X} symbol="X" isActive={activePlayer==='X'}
        onChangeName={handlePlayerNameChange}/>
        <Player initialname={PLAYERS.O} symbol="O" isActive={activePlayer==='O'}
        onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner||hasDraw) && <GameOver winner={winner}
      onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSqaure} board={gameBoard} />
    </div>
    <Log turns={gameturns}/>
  </main>
} 

export default App
