import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";

// Environment Setup
const MODE = 'development'
dotenv.config({ path: `.env.${MODE}` })
// Import Routers Start
import stripeRouter from './src/routers/stripeRouter';
import onchainRouter from './src/routers/onchainRouter';
// Import Routers End

// App Setup Start
import multer from 'multer';
const upload = multer();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// App Setup End


// Init Routers Start
app.use('/stripe', stripeRouter);
app.use('/onchain', onchainRouter)
// Init Routers End


// Start Server
const port = process.env.PORT || 5252

app.listen(port, () => { console.log(`App listening on PORT ${port}`) })

