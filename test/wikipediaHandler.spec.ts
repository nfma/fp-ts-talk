import { assert, property, string as fsString } from "fast-check"
import { right } from "fp-ts/lib/Either"
import { extractor } from "../src/wikipediaHandler"

describe("extractor", () =>  {
    it("should always return right when params has the property", () => {
        assert(property(fsString(), value => extractor({name: value}).value === right(value).value))
    })
})
