import * as express from "express"
import { Handler } from "./handlers";

export type ExpressHandler = (req: express.Request, res: express.Response) => void

export type HandlerAdapter = <A, B> (h: Handler<A, B>) => ExpressHandler

export const handlerAdapter: HandlerAdapter = handler => (req, res) => {
    const r = handler({content: req.body, params: req.params})
    if (typeof r.content == 'string')
        handleResponse(r.content)(res)
    else
        r.content.fold(e => handleError(e)(res), r => handleResponse(r)(res)).run()
}

const handleError = (e: Error) => (r: express.Response) => {
    r.status(500)
    r.send(e.message)
}

const handleResponse = <A> (a: A) => (r: express.Response) => {
    r.status(200)
    r.send(a)
}
