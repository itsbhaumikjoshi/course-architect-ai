import "reflect-metadata";
require("dotenv").config(); // reading the env file
require('tsconfig-paths/register');
import { AppDataSource as DataSource } from "@/helpers";


export const AppDataSource = DataSource.getDataSource();
