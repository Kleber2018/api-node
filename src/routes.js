import { Router } from 'express';

import SessionController from './controllers/SessionController';
import UserController from './controllers/UserController';
import PasswordController from './controllers/PasswordController';
import OcurrenceController from './controllers/OcurrenceController';
import CSVToJSONController from "./controllers/CSVToJSONController";

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.get('/export', CSVToJSONController.explodeCSV);


routes.get('/teste', (req, res) => {
    res.send('deu certo sss')
});

routes.get('/forgotPassword', PasswordController.store);

routes.post('/user', UserController.store);
routes.post('/login', SessionController.store);

//a partir daqui todas as rotas precisam de autenticação
routes.use(authMiddleware);

//user
routes.put('/user', UserController.update);

routes.get('/me', UserController.show);



// routes.delete('/user/delete', UserController.delete);

//occurence
routes.get('/ocurrences/me', OcurrenceController.me);
routes.post('/ocurrences', OcurrenceController.store);
routes.get('/ocurrences', OcurrenceController.show);
routes.get('/ocurrences/:id', OcurrenceController.show);
routes.delete('/ocurrences/:id', OcurrenceController.delete);
routes.put('/ocurrences/:id', OcurrenceController.update);



export default routes;
