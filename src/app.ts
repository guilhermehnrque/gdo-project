import "reflect-metadata"
import express, { Application, Request, Response } from 'express'
import bearerToken from "./infrastructure/middlewares/BearerToken"
import AuthRoute from './infrastructure/routes/v1/AuthRoute'
import GroupRoute from  './infrastructure/routes/v1/organizer/GroupRoute'
import InvitationRoute from './infrastructure/routes/v1/InvitationRoute'

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/organizer/groups', bearerToken.validate, GroupRoute)
app.use('/api/v1/invitations', bearerToken.validate, InvitationRoute)

app.get('/api/protected', bearerToken.validate, (request: Request, response: Response) => {
    response.json({ message: 'You have access to this protected route!', userId: request.userId, userType: request.userType });
})

export default app
