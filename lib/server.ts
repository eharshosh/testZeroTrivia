import * as express from "express";
import * as routerService from "./controllers/router.service";

serve();

function setupStaticFiles(app: express.Application) {
    app.use('/script', express.static('dist/public/lib'));
    app.use(express.static('public'));
}
function setupControllers(app: express.Application) {
    routerService.setup(app);
}

function serve() {
    const app: express.Application = express();
    setupStaticFiles(app);
    setupControllers(app);
    app.listen(8080);
}
