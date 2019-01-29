import * as express from "express";
import * as routerService from "./controllers/RouterSetup";

serve();

function setupStaticFiles(app: express.Application) {
    app.use("/script", express.static("dist/public/lib"));
    app.use(express.static("public"));
}
function setupControllers(app: express.Application) {
    routerService.setupRoutes(app);
}

function serve() {
    const app: express.Application = express();
    setupStaticFiles(app);
    setupControllers(app);
    app.listen(8080);
}
