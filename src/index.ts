import express, { Express, Request, Response } from "express";
import "@dotenvx/dotenvx/config";

import { getAppServices } from "@services/appServices";
import { log } from "@utils/logger";

const app: Express = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});