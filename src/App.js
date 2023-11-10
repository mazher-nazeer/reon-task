import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ChartPage from './pages/ChartPage';
import TablePage from './pages/TablePage';
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ChartPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
