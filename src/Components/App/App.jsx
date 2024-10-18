import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import userData from '../../../mockUsers.json'
// const Board = lazy(() => import('chess_components/Board'));
import { getUser } from '../../../apiCalls';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
// import MyGameCard from '../MyGameCard/MyGameCard';
import Users from '../Users/Users';
import Friends from '../Friends/Friends';
import './App.css';
import MyGames from '../MyGames/MyGames';

function App() {

  const [userData, setUserData] = useState({});
  const [isLogedIn, setIsLogedIn] = useState(false);
  const navigate = useNavigate();


  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const data = await getUser()
  //       setUserData(() => data)
  //     } catch (err) {
  //       console.err('Error :', err)
  //       navigate(`/error/${err.statusCode || 500}`, { state: { message: err.message || 'An unexpected error occurred.' } });
  //     }
  //   }
  //   fetchUsers();
  // }, []);

  useEffect(() => {
    const grabUserData = ()=> {
      setUserData(userData.data)
    }

    grabUserData()
  }, [])

  const userIsLogedIn = () => {
    setIsLogedIn(true)
  }

  const userLogOut = () => {
    setIsLogedIn(false)
  }

  return (
    <>
      {isLogedIn && 
      <Header userLogOut={userLogOut} />}
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Login userIsLogedIn={userIsLogedIn} />} />
        <Route path='/:userName/my_games/' element={<MyGames />}/>
        <Route path='/search/frien-emies' element={<Users />} />
        <Route path='/:username/frien-emies' element={<Friends />} />
        <Route path='/gameId' element={<GamePlay />}/>
        <Route path='/:username/statistics' element={<Stats />}/>
      </Routes>
      {/* <Footer /> */}
      {isLogedIn && <Footer />}
    </>
  );
}

export default App;