
const singleUser = 'https://b8c66bf6-d958-4e26-836c-432537824df7.mock.pstmn.io/api/v1/users/1'
 export const getUser = async ()=> {
    try {
          const res = await fetch(singleUser)
          const data = await res.json()
          // console.log('my data', data)
          setApiData(data.data)
    } catch (err) {
        return console.log('Error: ', err)
    }
}


