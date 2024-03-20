import { Outlet } from 'react-router-dom';
import './style.css';
import Header from './Header';

function App() {
  return (
    <>
      <Header />
      <div style={{ padding: "20px 20px 0px" }}>
        <Outlet />
      </div>
    </>

  );
}

export default App;
