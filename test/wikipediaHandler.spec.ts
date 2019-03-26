import { assert, string as fsString, property } from "fast-check"
import { extractor } from "../src/wikipediaHandler"
import { right } from "fp-ts/lib/Either"

describe("extractor", () =>  {
    it("should always return right when params has the property", () => {
        assert(property(fsString(), value => extractor({name: value}).value === right(value).value))
    })
})