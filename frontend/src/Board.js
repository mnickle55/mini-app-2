import Square from "./Square";
import { Container,Row } from "react-bootstrap";

const Board = ({matrix,handleClick,gameLost}) => {

  return ( 
    <Container>
      {!gameLost && <h1>Minesweeper</h1>}
      {gameLost && <h1>You Lost!</h1>}
      {matrix.map((row,index) => 
        <Row key={index}>
          {row.map((cell,ind) => {
            return <Square handleClick={handleClick} key={ind} state={matrix[index][ind]}/>
          })}
        </Row>
      )}
    </Container>
   );
}
 
export default Board;