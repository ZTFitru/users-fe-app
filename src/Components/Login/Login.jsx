import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import chessLogo from '../../assets/chess-with-frienemies-1.svg';
// import eye from '../../assets/eye.png'
import { postLogInUser } from '../../../apiCalls.jsx'
import './Login.css';

function Login({ userIsLoggedIn, defineUserId }) {

    const [email, setEmail] = useState('');
    // const [userEmailInput, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [userPasswordInput, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')
    const navigate = useNavigate();
    // const { userId } = useParams()
    // console.log(userId)

    const signInBtn = async (e) => {
        e.preventDefault();
      
        const userCredentials = { email, password };
      
        try {
          const userData = await postLogInUser(userCredentials);
          if (userData.data.id && userData.data.attributes) {
            defineUserId(userData.data.id);
            userIsLoggedIn(userData.data.id);
            // navigate(`/${userData.data.id}/my_games/`)
            navigate(`/search/frien-emies`)
          } else {
            setError('Username or password is incorrect.');
          }
        } catch (err) {
          setError('Login failed. Please try again.');
          console.error(err);
        }
      };

    // love this
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <section className='login-section'>
            <h1><div className='login-chess-with'>Chess with </div><div className='login-frien-emies'>Frien-EMIMES</div></h1>
            <img src={chessLogo} alt='chess pieces' className='login-chess-logo' />
            <div className='login-sign-in-wrapper'>
                <h2>Sign In</h2>
                <form onSubmit={signInBtn}>
                    {error && <div>{error}</div>}
                    <div className='login-email-wrapper'>
                        <label className='login-email-label'>Email</label>
                        <input
                            placeholder='name@example.com'
                            type='email'
                            value={email}
                            className='login-email-input'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='login-password-wrapper'>
                        <label className='login-password-label'>Password</label>
                        <input
                            placeholder='Enter password'
                            // type='password'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            className='login-password-input'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i onClick={togglePasswordVisibility} className='toggel-password-visiblity'>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </i>
                    </div>
                    <button type='submit' className='submit-button'>
                        Sign In
                    </button>
                </form>
            </div>
        </section >
    )
}

export default Login;