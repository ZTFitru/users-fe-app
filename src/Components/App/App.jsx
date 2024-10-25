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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [isFriends, setIsFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [myGames, setMyGames] = useState([]);

  const defineUserId = (id) => {
    setUserId(id);
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
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
        console.error('Error fetching logged in User')
      }
    }
    fetchLoggedInUser();
  }, [userId]);  

  
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
    setIsLoggedIn(true);
  };

  const userLogOut = () => {
    setIsLoggedIn(false);
    setUserData({});
  };

  return (
    <>
      {isLoggedIn && <Header userLogOut={userLogOut} userData={userData} />}
      <Routes>
        <Route path='/' element={<Login userIsLoggedIn={userIsLoggedIn} defineUserId={defineUserId} />} />
        <Route path='/:userId/my_games/' element={isLoggedIn ? <MyGames isLoggedIn={isLoggedIn} userData={userData} /> : <Navigate to="/" />} />
        <Route path='/search/frien-emies' element={isLoggedIn ? <Users userData={userData} users={users} setIsFriends={setIsFriends} /> : <Navigate to="/" /> } />
        <Route path='/:userId/frien-emies' element={isLoggedIn ? <Friends userData={userData} /> : <Navigate to="/" />} />
        <Route path='/:gameId' element={isLoggedIn ? <GamePlay playerId={userId} /> : <Navigate to="/" />} />
        <Route path='/:userId/statistics' element={isLoggedIn ? <Stats userData={userData}/> : <Navigate to="/" />} />
        <Route path="*" element={isLoggedIn ? <ErrorPage /> : <Navigate to="/" />} />
      </Routes>
      {isLoggedIn && <Footer userData={userData}/>}
    </>
  );
}

export default App;