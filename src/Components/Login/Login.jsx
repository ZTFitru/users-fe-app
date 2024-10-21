import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chessLogo from '../../assets/chess-with-frienemies-1.svg';
import eye from '../../assets/eye.png'
import './Login.css';
import { postLogInUser } from '../../../apiCalls.jsx'

function Login({ userIsLoggedIn, handleLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const signInBtn = (e) => {
        e.preventDefault();

        const userCradentials = { email, password }
        
        postLogInUser(userCradentials)
        .then(userData => {
            if(userData.ok) {
                userIsLoggedIn()
                // navigate('/search/frien-emies')
            } else {
                setError('Yup yup')
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
                            type='text'
                            value={email}
                            className='login-email-input'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='login-password-wrapper'>
                        <label className='login-password-label'>Password</label>
                        <input
                            placeholder='Enter password'
                            type='password'
                            value={password}
                            className='login-password-input'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img src={eye} alt='hide or show password' onClick={() => { }} className='login-hide-show-password'/>
                    </div>
                    <button type='submit'>
                        Sing In
                    </button>
                </form>
            </div>
        </section >
    )
}

export default Login;