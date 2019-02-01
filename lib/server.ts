import * as express from "express";

import * as controllersInitializer from "./controllers/Initializer";

serve();

function setupStaticFiles(app: express.Application) {
    app.use(express.static("static"));
}

function setupControllers(app: express.Application) {
    controllersInitializer.init(app);
}

function serve() {
    const app: express.Application = express();
    setupStaticFiles(app);
    setupControllers(app);
    app.listen(process.env.LISTENING_PORT);
}
