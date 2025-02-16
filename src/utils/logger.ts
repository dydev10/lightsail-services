import "@dotenvx/dotenvx/config";

const logChannels = [
	"console",
];

const getLogMessage = (message: string): string => {
	const channel = "console";
	const dateTime = new Date().toISOString();
	const { APP_NAME, PORT } = process.env;

	return `[${dateTime}][${APP_NAME}:${PORT}]:(${channel}):: ${message}`;
};

const logConsole = (logMessage: string) => {
	console.log(logMessage);
}

export const log = (message: string) => {
	const logMessage = getLogMessage(message);

	logChannels.forEach((channel) => {
		switch (channel) {
			case 'console':
				logConsole(logMessage);
				break;

			default:
				logConsole(logMessage);
		}
	});
};
