 require('./db/connect')
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/Login')
const requireAuth = require('./middleware/requireAuth')
const Upload = require('./routes/Upload')
const DriverRoutes = require('./routes/Drivers')
const FileSystem = require('./routes/FileSystemRoutes')
const Trucks = require('./routes/Trucks')
const Trips = require('./routes/TripRoutes')
const CommonRoutes = require('./routes/CommonRoutes')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const app = express()
//connect to mysql workbench database
//const formidableMiddleware = require('express-formidable');
//express app config

app.use(cors())
app.use(express.static('public'));
app.use(fileUpload())
app.use(bodyParser.json())
app.use(authRoutes)
app.use(Upload)
app.use(DriverRoutes)
app.use(Trucks)
app.use(Trips)
app.use(CommonRoutes)
app.use(FileSystem)


app.get('/', requireAuth, (req, res) =>{
    res.send(req.user)
})


app.listen(4000, () => console.log("running"))

