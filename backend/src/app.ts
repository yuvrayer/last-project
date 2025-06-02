import express, { json } from "express"
import config from 'config'
import sequelize from "./db/sequelize"
import errorLogger from "./middlewares/error/error-logger"
import errorResponder from "./middlewares/error/error-responder"
import notFound from "./middlewares/not-found"
import cors from 'cors'
import authRouter from "./routers/auth"
import adminRouter from "./routers/admin"
import userRouter from "./routers/user"
import followRouter from "./routers/follow"
import fileUpload from "express-fileupload"
import { createAppBucketIfNotExist } from "./aws/s3"

const port = config.get<string>('app.port')
const name = config.get<string>('app.name')
const force = config.get<boolean>('sequelize.sync.force')

const app = express();

(async () => {
    await sequelize.sync({ force })

    await createAppBucketIfNotExist();

    // middlewares
    app.use(cors()) // allow any client to use this server

    app.use(json()) // a middleware to extract the post/put/patch data and save it to the request object in case the content type of the request is application/json

    app.use(fileUpload())

    // [ if we have auth in this app, uncomment this ]:
    app.use('/auth', authRouter)

    // [ here is the place to mount routers on the app]:
    app.use('/vacations', userRouter)
    app.use('/follow', followRouter)
    app.use('/admin', adminRouter)


    // special notFound middleware
    app.use(notFound)

    // error middleware
    app.use(errorLogger)
    app.use(errorResponder)

    app.listen(port, () => console.log(`${name} started on port ${port}...`))
})()
