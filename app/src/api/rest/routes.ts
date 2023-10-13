import {monitor} from '@colyseus/monitor';
import {playground} from '@colyseus/playground';

import {Router} from 'express';
import {json} from 'body-parser';

import {StatusRouter} from './controllers/status/StatusRouter';

export interface ControllerRoutes {
    adminRoutes: Router;
    clientRoutes: Router;
    publicRoutes: Router;
    webhookRoutes: Router;
}

export const createRoutes = (): Router => {

    const statusRouter = StatusRouter.create();
    // API Routes
    const apiRouter = Router();
    apiRouter.use(json({limit: '100kb'}));

    apiRouter.use('/api', [
        statusRouter,
    ]);

    // UI Routes
    const uiRouter = Router();
    uiRouter.use(json({limit: '100kb'}));


    uiRouter.use('/ui/playground', playground);
    uiRouter.use('/ui/admin', monitor());

    // Main Router
    const mainRouter = Router();
    mainRouter.use(apiRouter);
    mainRouter.use(uiRouter);

    return mainRouter;
};
