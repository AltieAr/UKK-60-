import express from 'express';
import cors from 'cors';
//import routes here
import authRoute from './src/routes/authRoute.js';
import logRoute from './src/routes/logRoute.js';
import vehicletypeRoute from './src/routes/vehicleTypeRoute.js'
import parkAreaRoute from './src/routes/parkAreaRoute.js'
import feeRoute from './src/routes/feeRoute.js'
import userRoute from './src/routes/userRoute.js'
import transactionRoute from './src/routes/transactionRoute.js'
import reportRoute from './src/routes/reportRoute.js'
//import model after relationship
import './src/models/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//use routes here
app.use('/api', authRoute);
app.use('/api/log', logRoute);
app.use('/api/vehicle-type', vehicletypeRoute)
app.use('/api/area', parkAreaRoute)
app.use('/api/fee', feeRoute)
app.use('/api/user', userRoute)
app.use('/api/transaction', transactionRoute)
app.use('/api/owner', reportRoute)


export default app;