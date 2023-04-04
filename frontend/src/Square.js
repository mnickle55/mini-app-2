import Button from 'react-bootstrap/Button'

const Square = ({handleClick,state}) => {

  if(state.wasClicked === true) {
    if(state.isBomb === true){
      return ( 
        <Button onClick={()=>handleClick(state.num)} className="square-clicked">💣</Button>
    );
    } else {
        return ( 
          <Button onClick={()=>handleClick(state.num)} className="square-clicked">{state.adjacentBombCount}</Button>
      );
    }
    
  } else {
    return ( 
      <Button onClick={()=>handleClick(state.num)} className="square">{state.adjacentBombCount}</Button>
   );
  }
}
 
export default Square;