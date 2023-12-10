const express = require('express');
const cors = require('cors');
const {getAllUsers, getUser} = require('./usersData');

const app = express();

// const allowList = ['http://localhost:3000'];
const allowList = ['http://127.0.0.1:5500'];

const corsOriginDelegate = (req, callback)=>{
    let corsOptions;
    
    if(allowList.indexOf(req.header('Origin')) !== -1){
        corsOptions = {origin:true}
    }
    else{
        corsOptions = {origin:false}
    }
    
    callback(null, corsOptions);
}

// Allow all origins for GET requests
const corsOptionsDelegate = function (req, callback) {
    if (req.method === 'GET') {
        callback(null, { origin: true });
    } else {
        corsOriginDelegate(req, callback);
    }
};

app.get('/users', cors(corsOptionsDelegate), async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
        .json({
            users: await getAllUsers()
        });
});

app.get('/users/:id', cors(corsOriginDelegate), async (req, res) => {
    const userId = req.params.id;
    
    res.setHeader('Content-Type', 'application/json')
        .json({
            user: await getUser(userId)
        });
});



app.listen(process.env.PORT || 3000, function(){
    console.log(`Server is running on ${process.env.PORT || 3000}`);
})