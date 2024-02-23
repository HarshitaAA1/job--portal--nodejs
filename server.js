//const  express = require("express") it is common js
//rest object all the feeture of express come into app
import express from "express"//it is module js 
import 'express-async-errors'

import swaggerUi from 'swagger-ui-express'
import swaggerjsdoc from 'swagger-jsdoc'

import dotenv from "dotenv"
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
//files imports
import { connect } from "mongoose"
import connectdb from "./config/db.js"
import testRoutes from './routes/testroute.js'
import authRoutes from './routes/authrouter.js'
import errorMiddleware from "./middleware/errorMiddleware.js"
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobsRoute.js'

// congif dotenv 
dotenv.config()
//mongodb connection  

connectdb()
//api config
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "job portal application",
            description: "Node ExpressJs Job portal Application"
        },
        servers: [{
            url: "http://localhost:8080",

        }]
    },
    apis: ["./routes/*.js"]
}

const spec = swaggerjsdoc(options)

const app = express() // with this u can use app to create middle ware and routes

//middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/job', jobRoutes)


//homeroute
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(spec))




//validation middleware
app.use(errorMiddleware)
// for secure use dotenv file(have confidential server like port number,database address,
//secret Key, paymen gateway key) npm i dotenv







const PORT = process.env.PORT || 8080;
//application ko listen karne ke liye 
app.listen(PORT, () => {

    console.log(`node server running at ${process.env.PORT} mode on port ${PORT} `);
})


