import * as http from "http"
import { app } from "./app"
import { AddressInfo } from "net";

type Port = (add: string | AddressInfo) => number

const port: Port = a => typeof a === "string" ? parseInt(a) : a.port

const PORT = 3000

app.set("port", PORT)

const server = http.createServer(app)

server.listen(PORT, () => console.log("listening on port: " + port(server.address())))
