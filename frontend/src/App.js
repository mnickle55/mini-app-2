import './App.css';
import Board from './Board';
import { useEffect, useState, useCallback } from 'react';

function App() {

  const [matrix,setMatrix] = useState(null)
  const [gameLost,setGameLost] = useState(false)

  const handleClick = (index) => {
    // if(gameLost) return;
    let newMatrix = JSON.parse(JSON.stringify(matrix))
    if(index<10){
      if(newMatrix[0][index].isBomb===true){
        setGameLost(true)
      }
      newMatrix[0][index].wasClicked = true
    } else {
      let row = parseInt(index.toString().slice(0,1))
      let ind = parseInt(index.toString().slice(1,2))
      if(newMatrix[row][ind].isBomb===true){
        setGameLost(true)
      }
      newMatrix[row][ind].wasClicked = true
      
    }
    setMatrix(newMatrix)
  } 
  
  //setup matrix for board
  useEffect(()=> {
    let array = []
    for(let i=0;i<10;i++){
      let innerArray = [];
      for(let j=0;j<10;j++){
        innerArray.push({num:parseInt(`${i}${j}`) ,wasClicked: false,isBomb:false,adjacentBombCount:0})
      }
      array.push(innerArray)
    }
    for (let i=0;i<10;i++){
      let randomRow = Math.floor(Math.random() * 10);
      let randomCol = Math.floor(Math.random() * 10);
      array[randomRow][randomCol].isBomb = true
    }

    for (let i=0;i<10;i++){
      for (let j=0;j<10;j++){
        if(array[i][j].isBomb){
          let num = array[i][j].num
          console.log('bombs at: ',num)
          for (let k=0;k<10;k++){
            for (let z=0;z<10;z++){
              //left side of board
              if(array[k][z].num % 10 === 0){
                if(array[k][z].num+1===num || array[k][z].num+10===num || array[k][z].num+11===num || array[k][z].num-10===num || array[k][z].num-9===num) {
                  array[k][z].adjacentBombCount ++;
                }
              }
              //right side of board
              else if(array[k][z].num % 10 === 9){
                if(array[k][z].num-1===num || array[k][z].num+10===num  ||array[k][z].num+9===num  || array[k][z].num-10===num  || array[k][z].num-11===num  ) {
                  array[k][z].adjacentBombCount ++;
                }
              }
              //all others
              else {
                if(array[k][z].num-1===num  || array[k][z].num+10===num  ||array[k][z].num+9===num  || array[k][z].num-10===num  || array[k][z].num-11===num  || array[k][z].num+1===num  || array[k][z].num+11===num  || array[k][z].num-9===num  ) {
                  array[k][z].adjacentBombCount ++;
                }
              }
            }
          }
        }
      }
    }
    setMatrix(array)
  },[])


  if(matrix) {
    return (
      <div className="App">
        <Board gameLost={gameLost} handleClick={handleClick} matrix={matrix}/>
      </div>
    );
  }
}

export default App;
