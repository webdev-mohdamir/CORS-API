const getAllUsers = async ()=>{

    try {
        
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();

        return data.users;

    } catch (error) {
        return error
    }

}

const getUser = async (id)=>{

    try {
        
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await response.json();

        return data;

    } catch (error) {
        return error
    }

}

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;