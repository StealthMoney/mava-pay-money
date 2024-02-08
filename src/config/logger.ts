import { isDev } from "@/config/process"
import winston from "winston"

const transports = []

const logs = {
    level: process.env.LOG_LEVEL || "info"
}

if (isDev) {
    transports.push(
        new winston.transports.File({ filename: "error.log", level: "error" })
    )
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat()
            )
        })
    )
} else {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.splat()
            )
        })
    )
}

export const Logger = winston.createLogger({
    level: logs.level,
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports
})
