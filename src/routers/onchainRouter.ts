import { Router } from 'express';
import { 
    getTokenDataController,
    getTokenHoldersController
} from '../controllers/onchainController';

const onchainRouter = Router();
onchainRouter.get('/test', () => {console.log("Request recieved")})


onchainRouter.post('/getTokenData', getTokenDataController)
onchainRouter.post('/getTokenHolders', getTokenHoldersController)

export default onchainRouter;
