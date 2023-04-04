import './App.css';
import Board from './Board';
import { useEffect, useState } from 'react';

function App() {

  const [matrix,setMatrix] = useState(null)
  const [gameLost,setGameLost] = useState(false)
  const [reset,setReset] = useState(0)
  const [size,setSize] = useState(10)

  // [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24]]

  const handleResize = (number) => {
    setSize(number)
  }

  const handleClick = (index) => {
    console.log(index)
    if(index==='reset'){
      setReset(reset+1)
      return
    }
    // if(gameLost) return;
    let newMatrix = JSON.parse(JSON.stringify(matrix))
    if(Math.floor(index/size)===0){
      if(newMatrix[0][index].isBomb===true){
        setGameLost(true)
      }
      newMatrix[0][index].wasClicked = true
    } else {
      let row = Math.floor(index/size)
      let ind = index % size
      if(newMatrix[row][ind].isBomb===true){
        setGameLost(true)
      }
      newMatrix[row][ind].wasClicked = true
      
    }
    setMatrix(newMatrix)
  } 
  
  //setup matrix for board
  useEffect(()=> {
    setGameLost(false)
    let array = []
    for(let i=0;i<size;i++){
      let innerArray = [];
      for(let j=0;j<size;j++){
        innerArray.push({num:(i*size+j) ,wasClicked: false,isBomb:false,adjacentBombCount:0})
      }
      array.push(innerArray)
    }
    for (let i=0;i<size;i++){
      let randomRow = Math.floor(Math.random() * size);
      let randomCol = Math.floor(Math.random() * size);
      array[randomRow][randomCol].isBomb = true
    }

    for (let i=0;i<size;i++){
      for (let j=0;j<size;j++){
        if(array[i][j].isBomb){
          let num = array[i][j].num
          for (let k=0;k<size;k++){
            for (let z=0;z<size;z++){
              //left side of board
              if(array[k][z].num % size === 0){
                if(array[k][z].num+1===num || array[k][z].num+size===num || array[k][z].num+size+1===num || array[k][z].num-size===num || array[k][z].num-size+1===num) {
                  array[k][z].adjacentBombCount ++;
                }
              }
              //right side of board
              else if(array[k][z].num % size === size-1){
                if(array[k][z].num-1===num || array[k][z].num+size===num  ||array[k][z].num+size-1===num  || array[k][z].num-size===num  || array[k][z].num-size-1===num  ) {
                  array[k][z].adjacentBombCount ++;
                }
              }
              //all others
              else {
                if(array[k][z].num-1===num  || array[k][z].num+size===num  ||array[k][z].num+size-1===num  || array[k][z].num-size===num  || array[k][z].num-size+1===num  || array[k][z].num+1===num  || array[k][z].num+size+1===num  || array[k][z].num-size-1===num  ) {
                  array[k][z].adjacentBombCount ++;
                }
              }
            }
          }
        }
      }
    }
    setMatrix(array)
  },[reset,size])


  if(matrix) {
    return (
      <div className="App">
        <Board gameLost={gameLost} handleResize={handleResize} handleClick={handleClick} matrix={matrix}/>
      </div>
    );
  }
}

export default App;
