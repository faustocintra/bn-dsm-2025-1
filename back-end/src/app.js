import express from 'express'
import { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import usersRouter from './routes/users.js'
import categoriesRouter from './routes/categorias.js'
import fornecedoresRouter from './routes/fornecedores.js'  

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/users', usersRouter)
app.use('/categorias', categoriesRouter)
app.use('/fornecedores', fornecedoresRouter) 

export default app
