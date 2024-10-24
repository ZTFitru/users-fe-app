import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
// import userData from '../../../mockUsers.json'
//const Board = lazy(() => import('chess_components/Board'));
import {
  getUser,
  getUsersIndex,
  getFriendsIndex,
  getGamesIndex,
  postLogInUser,
  deleteLogOutUser,
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
  const [userId, setUserId] =  useState(null);
  // const [myGames, setMyGames] = useState([]);
  const navigate = useNavigate();
  const { loggedInId } = useParams();

  const handleUserLogin = (id) => {
    setUserId(id);
    // navigate(`/${id}/my_games/`)
  };

  // console.log('what', loggedInId)
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

  
  // const handleLogin = (loginResponse)=> {
  //   if(loginResponse) {
  //     setUserData({
  //       email: loginResponse.data.attributes.email,
  //     // username: loginResponse.data.attributes.username,
  //       avatar: loginResponse.data.attributes.avatar,
  //     // password: loginResponse.data.attributes.password
  //   })
  //   setIsLoggedIn(true)
  //   navigate(`/${loginResponse.data.id}/my_games/`)
  //   setUserId(loginResponse.data.id)
  //   } else {
  //     setIsLoggedIn(false) 
  //   }
  // }

  useEffect(() => {
    const fetchLogedInUser = async () => {
      try {
        const loginResponse = await getUser(userId);
        console.log('login response ->>>>>>',loginResponse)
        if(loginResponse) {
          setUserData({
            id: loginResponse.data.id,
            email: loginResponse.data.attributes.email,
            username: loginResponse.data.attributes.username,
            avatar: loginResponse.data.attributes.avatar,
        })
        setIsLoggedIn(true)
        // navigate(`/${loginResponse.data.id}/my_games/`)
        setUserId(loginResponse.data.id)
        } else {
          setIsLoggedIn(false) 
        }
      } catch (err) {
        console.error('Error fetching loged in User')
      }
    }
    fetchLogedInUser();
  }, [userId]);  

  console.log('UserID APP----->', userId)
  // ALL USERS
  useEffect(() => {
    const fetchUsers = async () => {
      if (userId) {
        try {
          const allUsersData = await getUsersIndex(userId);
          console.log('thisss', allUsersData)
          setUsers(allUsersData.data)
          console.log('all Users ->',allUsersData)
          console.log('Apppp->>>>>',allUsersData.data)
        } catch (err) {
          console.error('Error fetching user data:', err);
          // navigate(`/error/${err.status || 500}`, {
          //   state: { message: err.message || 'An unexpected error occurred.' }
          // })
        }
      }
    }
      fetchUsers()
    }, [userId]);

// useEffect(() => {
//   if(isLogedIn) {
//     const fetchGamesIndex = async () => {
//       try {
//       const userId = 1
//       const userGamesData = await getGamesIndex(userId);
//       setMyGames(userGamesData.data)
//     } catch {
//       console.error('Error fetching user data:', err);
//       navigate(`/error/${err.status || 500}`, {
//         state: { message: err.message || 'An unexpected error occurred.' }
//       })
//     }
//   }
//   fetchGamesIndex()
//   } 
// }, [isLogedIn, navigate])

  const userIsLoggedIn = () => {
    setIsLoggedIn(true)
  }

  const userLogOut = () => {
    setIsLoggedIn(false);
    setUserData({});
  }

  // moved to Friends and combined with the other function
  // const removeFriend = (user)=> {
  //   setIsFriends(allFriends => allFriends.filter(friend => friend.id !== user.id))
  // }

  // console.log(userData)
  return (
    <>
      {isLogedIn && <Header userLogOut={userLogOut} />}
      <Routes>
        {/* <Route path='/' element={<Login userIsLoggedIn={userIsLoggedIn} handleLogin={handleLogin} />} /> */}
        {/* <Route path='/' element={<Login userIsLoggedIn={userIsLoggedIn} handleLogin={handleLogin} />} /> */}
        <Route path='/' element={<Login userIsLoggedIn={userIsLoggedIn} handleUserLogin={handleUserLogin} userData={userData} />} />
        {/* <Route path='/' element={<GamePlay playerId={1} gameId={1}/>}/> */}
        <Route path='/:userId/my_games/' element={isLogedIn ? <MyGames userData={userData} isLogedIn={isLogedIn}/> : <Navigate to="/" />} />
        <Route path='/search/frien-emies' element={isLogedIn ? <Users userData={userData} userId={userId} users={users} isFriends={isFriends} setIsFriends={setIsFriends} handleUserLogin={handleUserLogin} /> : <Navigate to="/" /> } />
        <Route path='/:userId/frien-emies' element={isLogedIn ? <Friends userData={userData} userId={userId} users={users} isFriends={isFriends} /> : <Navigate to="/" />} />
        <Route path='/gameId' element={isLogedIn ? <GamePlay userData={userData} playerId={1} gameId={1}/> : <Navigate to="/" />} />
        <Route path='/:userId/statistics' element={isLogedIn ? <Stats userData={userData}/> : <Navigate to="/" />} />
      </Routes>
      {isLogedIn && <Footer userId={userId}/>}
    </>
  );
}

export default App;