import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import chessLogo from '../../assets/chess-with-frienemies-1.svg';
import eye from '../../assets/eye.png'
import { postLogInUser } from '../../../apiCalls.jsx'
import './Login.css';

function Login({ userIsLoggedIn, handleLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const signInBtn = (e) => {
        e.preventDefault();

        const userCradentials = { email, password }

        postLogInUser(userCradentials)
            .then(userData => {
                //userData.success
                if (userData.data && userData.attributes) {
                    userIsLoggedIn(userData)
                    navigate('/search/frien-emies')
                } else {
                    setError('User name or password is incorrect.')
                }
            })
            .catch(err => {
                console.error(err)
            })
        handleLogin(userCradentials)

        // if (email === 'whatever@example.com' && password === 'password') {
        //     userIsLoggedIn()
        //     navigate('/:username/my_games/')
        //     // navigate('/search/frien-emies')
        // } else {
        //     setError('Invalid entry, please try again') // error.message
        // }
    }
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
                            type='password'
                            // type={showPassword ? 'text' : 'password'}
                            value={password}
                            className='login-password-input'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <i onClick={togglePasswordVisibility} className='toggel-password-visiblity'>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </i>
                        {/* <img src={eye} alt='hide or show password' onClick={() => { }} className='login-hide-show-password'/> */}
                    </div>
                    <button type='submit' className='submit-button'>
                        Sing In
                    </button>
                </form>
            </div>
        </section >
    )
}

export default Login;