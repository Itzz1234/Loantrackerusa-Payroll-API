

import {getAllData} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';

const routes = (app: Application) => {

    app.post('/v2/get/all_data/loanId',  (req: Request, res: Response) => {
        const body = req.body;
        getAllData(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

}

export default routes;

