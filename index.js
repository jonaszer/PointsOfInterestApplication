const express = require('express');
const app = express();
const poi_router = require('./middleware/restApi');
const cors = require('cors');
const expressSession = require('express-session');
const { json } = require('express');


app.use(cors());
app.use(express.json());
app.use('/pointsofinterest', poi_router);


app.listen(3000, () => {
    console.log('Server has been started and running on PORT 3000...');
});