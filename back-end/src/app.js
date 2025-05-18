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

/****************** ROTAS INSANAS ********************/
import categoriasRouter from './routes/categorias.js'
import fornecedoresRouter from './routes/fornecedores.js'
import produtosRouter from './routes/produtos.js'
import clienteRouter from './routes/cliente.js'
import pedidosRouter from './routes/pedidos.js'

app.use('/categorias', categoriasRouter)
app.use('/fornecedores', fornecedoresRouter)
app.use('/produtos', produtosRouter)
app.use('/cliente', clienteRouter)
app.use('/pedidos', pedidosRouter)

export default app
