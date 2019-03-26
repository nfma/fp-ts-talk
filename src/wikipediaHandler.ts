import { Either, left, right } from "fp-ts/lib/Either"
import { fromEither, taskEither, TaskEither } from "fp-ts/lib/TaskEither"
import { Handler, Params } from "./handlers"

export type Extractor = (p: Params) => Either<Error, string>
export const extractor: Extractor = params => params.name != null ?
    right(params.name) : left(new Error("expected parameter name to be present!"))

type Validator = (s: string) => Either<Error, string>
const validator: Validator = word => right(word)

type Transformer = (word: string) => string
const transformer: Transformer = word => word.toLowerCase()

type DomainLogic = (word: string) => TaskEither<Error, string>
const domainLogic: DomainLogic = word => taskEither.of(word)

type WikipediaHandlerFactory = (e: Extractor, v: Validator, t: Transformer, d: DomainLogic) => Handler<string, string>
export const wikipediaHandlerFactory: WikipediaHandlerFactory = (e, v, t, d) =>
    request => ({content:
        taskEither.of<Error, Params>(request.params)
            .chain(params => fromEither(e(params)))
            .chain(word => fromEither(v(word)))
            .map(t)
            .chain(d)
        })

export const wikipediaHandler: Handler<string, string> =
    wikipediaHandlerFactory(extractor, validator, transformer, domainLogic)
