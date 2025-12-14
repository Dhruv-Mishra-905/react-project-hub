import React from 'react';
import Navbar from './components/navBar/navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Coin from './pages/coin/coin.jsx';
import CoinContextProvider from './context/coinContext.jsx'; // Correct provider import
import Footer from './components/footer/footer.jsx';

function App() {
  return (
    <CoinContextProvider>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coin/:coinID' element={<Coin />} />
        </Routes>
        <Footer/>
      </div>
    </CoinContextProvider>
  );
}

export default App;
