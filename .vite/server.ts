import express, { NextFunction, Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';

const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    configFile: './vite.config.ts',
    server: { middlewareMode: true },
    appType: 'custom', // don't include Vite's default HTML handling middlewares
  });

  app.use(cors);
  app.use(express.static('./packages/mermaid/dist'));
  // app.use(express.static('./packages/mermaid-example-diagram/dist'));
  app.use(express.static('./packages/mermaid-mindmap/dist'));
  app.use(vite.middlewares);
  app.use(express.static('demos'));
  app.use(express.static('cypress/platform'));

  app.listen(9000, () => {
    console.log(`Listening on http://localhost:9000`);
  });
}

createServer();
