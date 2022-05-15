//index.js
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const reservationsRouter = require("./routers/reservationsRouter");
const utilsRouter = require('./routers/utilsRouter');
const remindersRouter = require('./routers/remindersRouter');

const app = express();

app.use(cors())

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/reservations', reservationsRouter);
app.use("/utils", utilsRouter);
app.use('/reminders', remindersRouter)

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

