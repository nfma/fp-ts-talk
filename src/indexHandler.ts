import { Handler } from "./handlers"

export const indexHandler: Handler<void, string> = () => ({content: "Hello World!"})
