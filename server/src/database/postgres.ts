import User from "../entities/User";
import Account from "../entities/Account";
import Transaction from "../entities/Transaction";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "database",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "NgCash",
    synchronize: true,
    logging: false,
    entities: [User, Account, Transaction],
    subscribers: [],
    migrations: ['src/database/migrations'],
});