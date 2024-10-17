// import { lazy, Suspense } from 'react';
import { useState } from 'react';
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

  // const [userData, setUserData] = useState(null);
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

  const userIsLogedIn = () => {
    setIsLogedIn(true)
  }

  const userLogOut = () => {
    setIsLogedIn(false)
  }

  return (
    <>
      {/* {isLogedIn && <Header userLogOut={userLogOut} />} */}
      <Header />
      <Routes>
        <Route path='/' element={<Login userIsLogedIn={userIsLogedIn} />} />
        <Route path='/my_games/:userId' 
          element={<MyGames />}/>
        {/* <Route path='/users/:userId' element={<Users />} />
        <Route path='/friends/:userId' element={<Friends />} /> */}
        {/* <Route path='/' element={<GamePlay />}/> */}
        {/* <Route path='/' element={<Stats />}/> */}
      </Routes>
      {/* isLogedIn && <Footer /> */}
    </>
  );
}

export default App;