import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import categoriasRouter from './routes/categorias.js'
import fornecedorRouter from './routes/fornecedor.js'
import produtosRouter from './routes/produtos.js'
import clientesRouter from './routes/clientes.js'
import pedidosRouter from './routes/pedidos.js'

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/categorias', categoriasRouter)
app.use('/fornecedores', fornecedorRouter)
app.use('/produtos', produtosRouter)
app.use('/clientes', clientesRouter)
app.use('/pedidos', pedidosRouter)
export default app
