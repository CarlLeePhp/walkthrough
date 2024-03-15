import { Outlet } from 'react-router-dom';
import './style.css';
import Header from './Header';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>

  );
}

export default App;
