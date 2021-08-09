const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
const routeController = require('./usermanagement_api/v1')();

app.get('/usermanagement/v1',() => {
    console.log("At the start");
});
app.use('/usermanagement/v1',routeController);


app.listen(port, () => {
    console.log("Listening at port: ",port);

});
