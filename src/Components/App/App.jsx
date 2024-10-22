import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import userData from '../../../mockUsers.json'
//const Board = lazy(() => import('chess_components/Board'));
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
  const [users, setUsers] = useState([]);
  const [isFriends, setIsFriends] = useState([]);
  const [myGames, setMyGames] = useState([]);
  const navigate = useNavigate();

  // const handleLogin = async (userCredentials) => {
  //   try {
  //     const loginResponse = await postLogInUser(userCredentials);
  //     console.log(loginResponse)

  //     setUserData({
  //       email: loginResponse.data.attributes.email,
  //       username: loginResponse.data.attributes.username,
  //       avatar: loginResponse.data.attributes.avatar,
  //       password: loginResponse.data.attributes.password
  //     })
  //     setIsLoggedIn(true);
  //     navigate(`/${loginResponse.data.attributes.username}/my_games/`)
  //   } catch (err) {
  //     console.error('Error logging in the user:', err);
  //     navigate(`/error/${err.status || 500}`, {
  //       state: { message: err.message || 'An unexpected error occurred during login.' }
  //     });
  //   }
  // }

  // const handleLogin = ()=> {
  //   setUserData(userCredentials)
  //   setIsLoggedIn(true)
  // }

  
  const handleLogin = (loginResponse)=> {
    if(loginResponse) {
      setUserData({
        email: loginResponse.data.attributes.email,
      // username: loginResponse.data.attributes.username,
        avatar: loginResponse.data.attributes.avatar,
      // password: loginResponse.data.attributes.password
    })
    setIsLoggedIn(true)
    navigate(`${loginResponse.data.username}/my_games/`)
    } else {
      setIsLoggedIn(false) 
    }
    
    
    // navigate(`/${loginResponse.data.id}/my_games/`)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsersData = await getUsersIndex();
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

useEffect(() => {
  const fetchGamesIndex = async (userId) => {
    try {
      const userGamesData = await getGamesIndex();
      setMyGames(userGamesData.data)
    } catch (err) {
      console.error('Error fetching user data:', err);
      navigate(`/error/${err.status || 500}`, {
        state: { message: err.message || 'An unexpected error occurred.' }
      })
    }
  }
  fetchGamesIndex()
}, [])

  const userIsLoggedIn = () => {
    setIsLoggedIn(true)
  }

  const userLogOut = () => {
    setIsLoggedIn(false);
    setUserData({});
  }

  const removeFriend = (user)=> {
    setIsFriends(allFriends => allFriends.filter(friend => friend.id !== user.id))
  }

  return (
    <>
      {isLogedIn && <Header userLogOut={userLogOut} />}
      <Routes>
        {/* <Route path='/' element={<Login userIsLoggedIn={userIsLoggedIn} handleLogin={handleLogin} />} /> */}
        <Route path='/' element={<Login userIsLoggedIn={userIsLoggedIn} handleLogin={handleLogin} />} />
        {/* <Route path='/' element={<GamePlay playerId={1} gameId={1}/>}/> */}
        <Route path='/:username/my_games/' element={isLogedIn ? <MyGames myGames={myGames}/> : <Navigate to="/" />} />
        <Route path='/search/frien-emies' element={isLogedIn ? <Users users={users} isFriends={isFriends} setIsFriends={setIsFriends}/> : <Navigate to="/" /> } />
        <Route path='/:username/frien-emies' element={isLogedIn ? <Friends users={users} isFriends={isFriends} removeFriend={removeFriend}/> : <Navigate to="/" />} />
        <Route path='/gameId' element={isLogedIn ? <GamePlay playerId={1} gameId={1}/> : <Navigate to="/" />} />
        <Route path='/:username/statistics' element={isLogedIn ? <Stats /> : <Navigate to="/" />} />
      </Routes>
      {isLogedIn && <Footer />}
    </>
  );
}

export default App;