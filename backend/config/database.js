import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const databaseURL = process.env.DATABASE_URL_UNPOOLED

const sequelize = new Sequelize(databaseURL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {require: true, rejectUnauthorized: false},
    },
});

// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: "postgres",
//     }
// );

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL!");
        await sequelize.sync({
            alter: process.env.NODE_ENV === "development",
        });
        console.log("Table Synchronized!");
    } catch (error) {
        console.error("Connection failed", error);
        process.exit(1);
    }
}
export { sequelize, connectDB };