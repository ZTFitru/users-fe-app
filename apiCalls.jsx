
// const singleUser = 'https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/1';
//  export const getUser = async () => {
//     try {
//           const res = await fetch(singleUser)
//           const data = await res.json()
//           // console.log('my data', data)
//           setApiData(data.data)
//     } catch (err) {
//         return console.log('Error: ', err)
//     }
// }


/*-----------------------------------// GET //--------------------------------------*/

// Not sure this first one getUser is needed. Can we use the POST res for the user?
export const getUser = async (userId) => {
    try {
        const res = await fetch(`https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/${userId}`)
        if (!res.ok) {
            throw new Error(`There was an error fetching the loggin in user: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (err) {
        return console.error('Error in fetching the loggedIn User:', err)
    }
}

export const getUsersIndex = async () => {
    try {
        const res = await fetch('https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users') 
        if (!res.ok) {
            throw new Error(`There was an error fetching the users.: ${res.status}`)
        }
        const allUsersData = await res.json();
        return allUsersData
    } catch (err) {
        return console.error('Error in fetching the users:', err)
    }
}

export const getFriendsIndex = async (userId) => {
    try {
        const res = await fetch(`https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/${userId}/friends`)
        if (!res.ok) {
            throw new Error(`There was an error fetching friends list: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (err) {
        return console.error('Error in fetching Frien-EMIES list:', err)
    }
}

export const getGamesIndex = async (userId) => {
    try {
        const res = await fetch(`https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/${userId}/my_games`)
        if (!res.ok) {
            throw new Error(`There\'s been an error loading the games list: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (err) {
        return console.error('Error in fetching games list:', err)
    }
}

/*-----------------------------------// POST //--------------------------------------*/

export const postLogInUser = async (user) => {
    try {
        const res = await fetch(`https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!res.ok) {
            throw new Error(`There was a problem with the POST for the login: ${res.status}`)
        }

        const resData = await res.json();
        return resData
    } catch (err) {
        console.error('Error in POSTing the user login:', err)
    }
}

export const postLogOutUser = async (userId, user) => {
    try {
        const res = await fetch(`https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/${userId}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!res.ok) {
            throw new Error(`There was a problem loging the user out: ${res.status}`)
        }

        const resData = res.json();
        return resData
    } catch (err) {
        console.error('Err in POST for Log Out:', err)
    }
}

export const postAddFriend = async (user) => {
    try {
        const res = await fetch(`https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/add_friend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!res.ok) {
            throw new Error(`There was a problem adding friend to freind's list: ${res.status}`)
        }

        const resData = response.json();
        return resData
    } catch (err) {
        console.error('Err in POST for adding a freind:', err)
    }
}

/*-----------------------------// Delete //---------------------------------*/

export const deleteFriend = async (userId, user) => {
    try {
        const res = await fetch(`https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/${userId}/remove_friend`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user) // need to stringify the user object
        });

        const resData = await res.json();
        return resData
    } catch (err) {
        console.error('Err in DELETE of friend', err)
    }
}