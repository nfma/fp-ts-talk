import { TaskEither } from "fp-ts/lib/TaskEither"

export type Params = { [k: string]: string }

export type Request<A> = {
    params: Params,
    content: A
}

export type Response<A> = {
    content: string | TaskEither<Error, A>
}

export type Handler<A, B> = (req: Request<A>) => Response<B>
