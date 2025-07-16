import "reflect-metadata";
require("dotenv").config(); // reading the env file

import Server from "@/Server";

const server = new Server();
server.start();
