import "@dotenvx/dotenvx/config";
import express, { Express, Request, Response } from "express";
import http from 'http';
import https from 'https';
import fs from 'fs';

import { getAppServices } from "@services/appServices";
import { log } from "@utils/logger";
import path from "path";

export type AppEnv = {
	PORT: number | undefined;
	APP_NAME: string | undefined;
	
	SSL_PORT: number | undefined;
	SSL_KEY_PATH: string | undefined;
	SSL_CERT_PATH: string | undefined;
};

const app: Express = express();
const { PORT, SSL_PORT, SSL_KEY_PATH, SSL_CERT_PATH } = process.env as AppEnv;

app.get("/", (req: Request, res: Response) => {
	log('AppServer Visiter')
	res.send("Lightsail Services :: AppServer");
});

app.get("/services", async (req: Request, res: Response) => {
	log('Incoming Request -- Services List');
	const list = await getAppServices();
	
	res.send({ services: list });
	return;
});


// Create an HTTP service.
http.createServer(app).listen(PORT, undefined, undefined, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});



// Skip https if ssl cert path is not defined in env
if (SSL_PORT && SSL_KEY_PATH?.length && SSL_CERT_PATH?.length) {
	var sslOptions = {
		key: fs.readFileSync(path.join(__dirname, SSL_KEY_PATH)),
		cert: fs.readFileSync(path.join(__dirname, SSL_CERT_PATH)),
	};
	// Create an HTTPS service identical to the HTTP service.
	https.createServer(sslOptions, app).listen(SSL_PORT, undefined, undefined, () => {
		console.log(`[server-https]: SSL Server is running at https://localhost:${SSL_PORT}`);
	});
	
}