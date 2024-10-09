import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Transactions from './components/Transactions';
import Stats from './components/Stats';

const App = () => {
  let [month, setMonth] = useState(3);

  const handleMonthChange = (event) => {
    setMonth(parseInt(event.target.value));
  };

  return (
    <BrowserRouter>
      <div className="layout">
        <header className="header">
          <h1 className="header-title">Transactions Dashboard</h1>
          <nav className="nav">
            <NavLink to="/" className="nav-link">TRANSACTIONS</NavLink>
            <NavLink to="/stats" className="nav-link">STATS</NavLink>
          </nav>
          <select onChange={handleMonthChange} defaultValue={month} className="month-select">
            {["All Months", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((text, i) => (
              <option key={i} value={i}>{text}</option>
            ))}
          </select>
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<Transactions month={month} />} />
            <Route path="/stats" element={<Stats month={month} />} />
          </Routes>
        </main>
        <footer className="footer">
          Created by <strong>Sumedh Suralkar</strong>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
