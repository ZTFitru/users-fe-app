import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser, getUsersIndex } from '../../../apiCalls';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Users from '../Users/Users';
import Friends from '../Friends/Friends';
import MyGames from '../MyGames/MyGames';
import GamePlay from '../GamePlay/GamePlay';
import Stats from '../Stats/Stats';
import ErrorPage from '../ErrorPage/ErrorPage';
import './App.css';

function App() {

  const [userId, setUserId] =  useState(null);
  const [userData, setUserData] = useState({});
  const [isLogedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [isFriends, setIsFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [myGames, setMyGames] = useState([]);

  const defineUserId = (id) => {
    setUserId(id);
  };

  useEffect(() => {
    const fetchLogedInUser = async () => {
      try {
        const loginResponse = await getUser(userId);
        if(loginResponse) {
          setUserData({
            id: loginResponse.data.id,
            email: loginResponse.data.attributes.email,
            username: loginResponse.data.attributes.username,
            avatar: loginResponse.data.attributes.avatar,
        })
        setIsLoggedIn(true)
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

  // ALL USERS
  useEffect(() => {
    const fetchUsers = async () => {
      if (userId) {
        try {
          const allUsersData = await getUsersIndex(userId);
          setUsers(allUsersData.data)
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      }
    }
      fetchUsers()
    }, [userId]);

  const userIsLoggedIn = () => {
    setIsLoggedIn(true)
  }

  const userLogOut = () => {
    setIsLoggedIn(false);
    setUserData({});
  };

  return (
    <>
      {isLogedIn && <Header userLogOut={userLogOut} />}
      <Routes>
        <Route path='/' element={<Login userIsLoggedIn={userIsLoggedIn} defineUserId={defineUserId} userData={userData} />} />
        <Route path='/:userId/my_games/' element={isLogedIn ? <MyGames userData={userData} isLogedIn={isLogedIn} myGames={myGames} userID={userId} userIsLoggedIn={userIsLoggedIn} friendsList={friendsList} /> : <Navigate to="/" />} />
        <Route path='/search/frien-emies' element={isLogedIn ? <Users userData={userData} userId={userId} users={users} isFriends={isFriends} setIsFriends={setIsFriends} setUserId={setUserId} friendsList={friendsList}  /> : <Navigate to="/" /> } />
        <Route path='/:userId/frien-emies' element={isLogedIn ? <Friends userData={userData} userId={userId} users={users} isFriends={isFriends} friendsList={friendsList} setIsFriends={setIsFriends} /> : <Navigate to="/" />} />
        <Route path='/gameId' element={isLogedIn ? <GamePlay userId={userId} userData={userData} playerId={1} gameId={1}/> : <Navigate to="/" />} />
        <Route path='/:userId/statistics' element={isLogedIn ? <Stats userData={userData}/> : <Navigate to="/" />} />
        <Route path="*" element={isLogedIn ? <ErrorPage /> : <Navigate to="/" />} />
      </Routes>
      {isLogedIn && <Footer userId={userId}/>}
    </>
  );
}

export default App;