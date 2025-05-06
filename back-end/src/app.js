import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)



/***************ROTAS***************/


import categoriasRouter from '../src/routes/categorias.js'
app.use ('/categorias', categoriasRouter)

import fornecedoresRouter from '../src/routes/fornecedores.js'
app.use ('/fornecedores', fornecedoresRouter)

import produtosRouter from '../src/routes/produtos.js'
app.use ('/produtos', produtosRouter)

import clientesRouter from '../src/routes/clientes.js'
app.use ('/clientes', clientesRouter)

import pedidosRouter from '../src/routes/pedidos.js'
app.use ('/pedidos', pedidosRouter)

export default app
