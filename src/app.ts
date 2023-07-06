import express, { Express, Request, Response } from 'express';
import { routes } from './routes';


export async function createServer(customPort = 8000): Promise<Express> {

  const app: Express = express();
  const port = (customPort !== 8000) 
                  ? customPort 
                  : process.env.PORT || 8000;

  app.use(express.json()); // json format via request

  // routes
  app.use('/', routes);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running ${Date.now()} at http://localhost:${port} with ENV ${process.env.NODE_ENV}`);
  });

  return app;

};

createServer();