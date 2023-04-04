import { useState, useRef, useEffect } from "react";
import { Container, Row } from "react-bootstrap";

const Timer = () => {

  const [num, setNum] = useState(0);
  const [pause, setPause] = useState(false);
  
  let intervalRef = useRef();
  
  const increaseNum = () => setNum((prev) => prev + 1);

  useEffect(() => {
    intervalRef.current = setInterval(increaseNum, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);
  
  return (
    <Container className='py-2'>
      <Row>Elapsed Time: {num}</Row>
    </Container>
  );
}
 
export default Timer;