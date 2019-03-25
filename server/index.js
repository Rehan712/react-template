const express = require('express');
const app = express();
const middleware = require('./middleware');

middleware(app,express);



const port = process.env.PORT || 7000

app.listen(port,()=>console.log('listening on port',port))
