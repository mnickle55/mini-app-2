import Square from "./Square";
import { Container,Row,Col, Button,ButtonGroup } from "react-bootstrap";

const Board = ({matrix,handleClick,gameLost,handleResize}) => {

  return ( 
    <Container>
      {!gameLost && 
      <>
        <Row className="py-2">
          <Col>
            <h1>Minesweeper</h1>
          </Col>
        </Row>
        <Row className='pb-4'>
          <h4>Set Grid Size</h4>
          <Col>
            <ButtonGroup className="me-2" aria-label="First group">
              <Button onClick={()=>handleResize(4)}>4</Button> 
              <Button onClick={()=>handleResize(5)}>5</Button> 
              <Button onClick={()=>handleResize(6)}>6</Button>
              <Button onClick={()=>handleResize(7)}>7</Button>
              <Button onClick={()=>handleResize(8)}>8</Button>
              <Button onClick={()=>handleResize(9)}>9</Button>
              <Button onClick={()=>handleResize(10)}>10</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </>
      }
      {gameLost && 
      <>
      <Row className="py-2">
        <Col>
          <h1>You Lost!</h1>
        </Col>
        <Col>
          <Button onClick={()=>handleClick('reset')}>Play Again</Button>
        </Col>
      </Row>
      <Row className='pb-4'>
      <h4>Set Grid Size</h4>
      <Col>
        <ButtonGroup className="me-2" aria-label="First group">
          <Button onClick={()=>handleResize(4)}>4</Button> 
          <Button onClick={()=>handleResize(5)}>5</Button> 
          <Button onClick={()=>handleResize(6)}>6</Button>
          <Button onClick={()=>handleResize(7)}>7</Button>
          <Button onClick={()=>handleResize(8)}>8</Button>
          <Button onClick={()=>handleResize(9)}>9</Button>
          <Button onClick={()=>handleResize(10)}>10</Button>
        </ButtonGroup>
      </Col>
    </Row>
      </> }
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