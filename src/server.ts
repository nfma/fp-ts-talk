import * as http from "http"
import { AddressInfo } from "net"
import { app } from "./app"

type Port = (add: string | AddressInfo) => number

const port: Port = a => typeof a === "string" ? parseInt(a, 10) : a.port

const PORT = 3000

app.set("port", PORT)

const server = http.createServer(app)

// tslint:disable-next-line:no-console
server.listen(PORT, () => console.log("listening on port: " + port(server.address())))
