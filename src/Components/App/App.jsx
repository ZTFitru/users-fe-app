import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import userData from '../../../mockUsers.json'
// const Board = lazy(() => import('chess_components/Board'));
import {
  getUser,
  getUsersIndex,
  getFriendsIndex,
  getGamesIndex,
  postLogInUser,
  postLogOutUser,
  postAddFriend,
  deleteFriend
} from '../../../apiCalls';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
// import MyGameCard from '../MyGameCard/MyGameCard';
import Users from '../Users/Users';
import Friends from '../Friends/Friends';
import './App.css';
import MyGames from '../MyGames/MyGames';
import GamePlay from '../GamePlay/GamePlay';
import Stats from '../Stats/Stats';

function App() {

  const [userData, setUserData] = useState({});
  const [isLogedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const handleLogin = async (userCredentials) => {
    try {
      const loginResponse = await postLogInUser(userCredentials);

      setUserData({
        email: loginResponse.data.attributes.email,
        username: loginResponse.data.attributes.username,
        avatar: loginResponse.data.attributes.avator,
        password: loginResponse.data.attributes.password
      })
      setIsLoggedIn(true);
      navigate(`/${loginResponse.data.attributes.username}/my_games/`)
    } catch (err) {
      console.error('Error logging in the user:', err);
      navigate(`/error/${err.status || 500}`, {
        state: { message: err.message || 'An unexpected error occurred during login.' }
      });
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsersData = await getUsersIndex();

 console.log(allUsersData, 'USERS DATA FROM APP <><><><>')

        setUsers(allUsersData.data)
      } catch (err) {
        console.error('Error fetching user data:', err);
        navigate(`/error/${err.status || 500}`, {
          state: { message: err.message || 'An unexpected error occurred.' }
        })
      }
    }
      fetchUsers()
    }, [navigate]);


  const userIsLoggedIn = () => {
    setIsLoggedIn(true)
  }

  const userLogOut = () => {
    setIsLoggedIn(false);
    setUserData({});
  }

  return (
    <>
      {isLogedIn && <Header userLogOut={userLogOut} />}
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Login userIsLoggedIn={userIsLoggedIn} handleLogin={handleLogin} />} />
        <Route path='/:username/my_games/' element={<MyGames />} />
        <Route path='/search/frien-emies' element={<Users users={users} />} />
        <Route path='/:username/frien-emies' element={<Friends users={users}/>} />
        <Route path='/gameId' element={<GamePlay />} />
        <Route path='/:username/statistics' element={<Stats />} />
      </Routes>
      {/* <Footer /> */}
      {isLogedIn && <Footer />}
    </>
  );
}

export default App;