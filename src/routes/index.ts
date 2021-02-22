import { Router } from 'express';
import rulesRoutes from './rules.routes';

const routes = Router();

routes.use('/rules', rulesRoutes);

export default routes;
