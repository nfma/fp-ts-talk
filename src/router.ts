import * as express from "express"
import { ExpressHandler } from "./handlerAdapter"

type GetRouterFactory = (path: string, h: ExpressHandler) => express.Router

export const get: GetRouterFactory = (path, h) => {
    const router = express.Router()
    router.get(path, h)
    return router
}
