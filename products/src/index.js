const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils');

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();

    const channel = await CreateChannel();
    
    await expressApp(app, channel);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })

    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();

// const express = require('express')
// const app = express();

// app.use(express.json());

// app.use('/', (req, res) => {
//     return res.status(200).json({'msg': 'Hello from products'})
// })

// app.listen(8002, () => {
//     console.log('Product is listening on Port 8002')
// })