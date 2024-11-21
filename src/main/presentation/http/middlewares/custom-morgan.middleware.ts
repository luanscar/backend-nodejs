import { logger } from "@shared/helpers/logger.winston";
import morgan from "morgan";

const stream = {
	write: (message: string) => logger.http(message.trim()),
};

const skip = () => {
	const env = process.env.NODE_ENV || "development";
	return env !== "development";
};

const formatDefault =
	":remote-addr :method :url :status :res[content-length] - :response-time ms";

const customMorganMiddleware = morgan(formatDefault, { stream, skip });

export { customMorganMiddleware as customMorgan };
