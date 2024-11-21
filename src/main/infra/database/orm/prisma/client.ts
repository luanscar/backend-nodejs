import { PrismaClient } from "@prisma/client";
import { logger } from "@shared/helpers/logger.winston";

// Define proper types for Prisma events
type QueryEvent = {
	timestamp: Date;
	query: string;
	params: string;
	duration: number;
	target: string;
};

type PrismaEvent = {
	timestamp: Date;
	message: string;
	target?: string;
};

// Declare global prisma instance type
declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

// Create Prisma client with logging configuration
const prisma =
	global.prisma ||
	new PrismaClient({
		log: [
			{ emit: "event", level: "query" },
			{ emit: "event", level: "info" },
			{ emit: "event", level: "error" },
			{ emit: "event", level: "warn" },
		],
		errorFormat: "minimal",
	});

// Type-safe event handlers
prisma.$on("query" as never, (event: QueryEvent) => {
	logger.sql({
		timestamp: event.timestamp,
		query: event.query,
		params: event.params,
		duration: event.duration,
		target: event.target,
	});
});

prisma.$on("info" as never, (event: PrismaEvent) => {
	logger.info({
		timestamp: event.timestamp,
		message: event.message,
		target: event.target,
	});
});

prisma.$on("error" as never, (event: PrismaEvent) => {
	logger.error({
		timestamp: event.timestamp,
		message: event.message,
		target: event.target,
	});
});

prisma.$on("warn" as never, (event: PrismaEvent) => {
	logger.warn({
		timestamp: event.timestamp,
		message: event.message,
		target: event.target,
	});
});

// Set global prisma instance in development
if (process.env.NODE_ENV === "development") {
	global.prisma = prisma;
}

export { prisma };
