

import {getLoanOfficerInfo,getLoanProcessorInfo} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';


const routes = (app: Application) => {

    app.post('/v2/loan/officer/info',  (req: Request, res: Response) => {
        const body = req.body;
        getLoanOfficerInfo(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/loan/processor/info',  (req: Request, res: Response) => {
        const body = req.body;
        getLoanProcessorInfo(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

}

export default routes;
