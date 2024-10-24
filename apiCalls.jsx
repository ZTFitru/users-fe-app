/*-----------------------------------// GET //--------------------------------------*/

export const getUser = async (userId) => {
    try {
        const res = await fetch(`https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/${userId}`)
        if (!res.ok) {
            throw new Error(`There was an error fetching the loggin in user: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (err) {
        console.log('Error in fetching the loggedIn User:', err)
        throw err
    }
}

export const getUsersIndex = async (userId) => {
    try {
        const res = await fetch(`https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/${userId}/index`) 
        if (!res.ok) {
            throw new Error(`There was an error fetching the users.: ${res.status}`)
        }
        const allUsersData = await res.json();

        // console.log('work now ->>>>',allUsersData)

        return allUsersData
    } catch (err) {
        console.log('Error in fetching the users:', err)
        throw err
    }
}

export const getFriendsIndex = async (userId) => {
    try {
        const res = await fetch(`https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/${userId}/friends`)
        if (!res.ok) {
            throw new Error(`There was an error fetching friends list: ${res.status}`)
        }
        const data = await res.json()
        return data
    } catch (err) {
        console.log('Error in fetching Frien-EMIES list:', err)
        throw err
    }
}

export const getGamesIndex = async (userId) => {
    try {
        const res = await fetch(`https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/${userId}/my_games`)
        if (!res.ok) {
            throw new Error(`There's been an error loading the games list: ${res.status}`)
        }
        const data = await res.json();

        console.log('Fetched games data:', data);

        return data
    } catch (err) {
        console.log('Error in fetching games list:', err)
        throw err
    }
}

/*-----------------------------------// POST //--------------------------------------*/

export const postLogInUser = async (user) => {
    try {
        const res = await fetch(`https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions`, {
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
        throw err
    }
}

export const postAddFriend = async (userId, user_id) => {
    console.log('api call ->>>', user_id)
    try {
        const res = await fetch(`https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/users/${userId}/add_friend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id })
        });

        if (!res.ok) {
            const errorResponse = await res.text();
            throw new Error(`There was a problem adding friend to freind's list: ${res.status} ${res.statusText}. Details: ${errorResponse}`)
        }

        const resData = await res.json();

        console.log('API response data POST friend:', resData);

        return resData
    } catch (err) {
        console.error('Err in POST for adding a freind:', err)
        throw err
    }
}

/*-----------------------------// Delete //---------------------------------*/

export const deleteLogOutUser = async (userId) => {
    try {
        const res = await fetch(`https://chess-with-frein-emies-e45d9fb62d80.herokuapp.com/api/v1/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userId)
        });

        if (!res.ok) {
            throw new Error(`There was a problem loging the user out: ${res.status}`)
        }

        const resData = res.json();
        return resData
    } catch (err) {
        console.error('Err in POST for Log Out:', err)
        throw err
    }
}

export const deleteFriend = async (userId, friendId) => {
    try {
        const res = await fetch(`https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/${userId}/remove_friend`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(friendId) 
        });
        
        const resData = await res.json();
        return resData
    } catch (err) {
        console.error('Err in DELETE of friend', err)
        throw err
    }
}