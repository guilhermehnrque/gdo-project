import "reflect-metadata"
import express, { Application } from 'express'
import AuthRoute from './infrastructure/routes/v1/AuthRoute'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', AuthRoute)

export default app
