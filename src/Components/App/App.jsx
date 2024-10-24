import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useParams } from 'react-router-dom';
// import userData from '../../../mockUsers.json'
//const Board = lazy(() => import('chess_components/Board'));
import { getUser, getUsersIndex } from '../../../apiCalls';
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
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {

  const [userId, setUserId] =  useState(null);
  const [userData, setUserData] = useState({});
  const [isLogedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [isFriends, setIsFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [myGames, setMyGames] = useState([]);
  // const navigate = useNavigate();
  // const { loggedInId } = useParams();

  const defineUserId = (id) => {
    console.log('defining user id..... ', id)
    setUserId(id);
  };

  useEffect(() => {
    const fetchLogedInUser = async () => {
      try {
        const loginResponse = await getUser(userId);
        //console.log('login response ->>>>>>',loginResponse)
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

  // console.log('UserID APP----->', userId)
  // ALL USERS
  useEffect(() => {
    const fetchUsers = async () => {
      if (userId) {
        try {
          const allUsersData = await getUsersIndex(userId);
          //console.log('thisss', allUsersData)
          setUsers(allUsersData.data)
          //console.log('all Users ->',allUsersData)
          //console.log('Apppp->>>>>',allUsersData.data)
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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {isLogedIn && <Footer userId={userId}/>}
    </>
  );
}

export default App;