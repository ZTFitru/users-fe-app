// import { lazy, Suspense } from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// const Board = lazy(() => import('chess_components/Board'));
import { getUser } from '../../../apiCalls';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import MyGameCard from '../MyGameCard/MyGameCard';
import Users from '../Users/Users';
import Friends from '../Friends/Friends';
import './App.css';
import MyGames from '../MyGames/MyGames';

function App() {
  
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  

  useEffect(()=> {
    const fetchUsers = async ()=> {
      try {
        const data = await getUser()
        setUserData(() => data)
      } catch (err) {
        console.err('Error :', err)
        navigate(`/error/${err.statusCode || 500}`, { state: { message: err.message || 'An unexpected error occurred.' } });
      }
    }
    fetchUsers();
  }, []);
  
  return (
    <>
      <h1><span>Chess with </span><span>Frien-EMIMES</span></h1>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/my_games/:username' element={<MyGames />}/>
        <Route path='/users/:userId' element={<Users />}/>
        <Route path='/friends/:username' element={<Friends />}/>
        {/* <Route path='/' element={<GamePlay />}/> */}
        {/* <Route path='/' element={<Stats />}/> */}
      </Routes>
    </>
  );
}

export default App;