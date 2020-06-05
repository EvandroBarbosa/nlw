import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './src/routes'
import { errors } from 'celebrate'

const app = express();

app.use(cors())
app.use(express.json())

app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '.', 'uploads')))
app.use('/uploads/img', express.static(path.resolve(__dirname, '.', 'uploads', 'img')))

app.use(errors())

export default app;