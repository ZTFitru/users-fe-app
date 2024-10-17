import React from 'react';
import { useState } from 'react';
import chessLogo from '../../assets/chess-with-frienemies-1.svg';
import eye from '../../assets/eye.png'
import './Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInBtn = (e) => {
      e.preventDefault();
      
    }

    return (
        <section className='cont'>
            <h1><span>Chess with </span><span>Frien-EMIMES</span></h1>
            <img src={chessLogo} alt='chess pieces' />
            <h2>Sign In</h2>
            <form onSubmit={signInBtn}>
                <div>
                    <label>Email</label>
                    <input
                        placeholder='name@example.com'
                        type='text'
                        value={email}
                        className=''
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        placeholder='Enter password'
                        type='password'
                        value={password}
                        className=''
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <img src={eye} alt='hide or show password' onClick={() => {}}/>
                </div>
                <button type='submit'>
                    Sing In
                </button>
            </form>
        </section>
    )
}

export default Login;