import { lazy, Suspense } from 'react';
const Board = lazy(() => import('chess_components/Board'));

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import MyGameCard from '../MyGameCard/MyGameCard';
import Users from '../Users/Users';
import Friends from '../Friends/Friends';
import './App.css';

function App() {
  return (
    <>
      <h1>Host App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Board msg='This guy i tell ya....' />
      </Suspense>
    </>
  );
}

export default App;