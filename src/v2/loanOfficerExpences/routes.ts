

import {addMemberExpenceDetail, updateMemberExpenceDetail, deleteMemberExpence, getAllMemberExpencesByLoanId} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';

const routes = (app: Application) => {

    // get all
    app.post('/v2/members/expenses/loanId/get',  (req: Request, res: Response) => {
        const body = req.body;
        getAllMemberExpencesByLoanId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    // create
    app.post('/v2/members/expenses/add', (req: Request, res: Response) => {
        const body = req.body;
        addMemberExpenceDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    // update
    app.post('/v2/members/expenses/update',  (req: Request, res: Response) => {
        const body = req.body;
        console.log(body)
        updateMemberExpenceDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    // delete
    app.post('/v2/members/expenses/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteMemberExpence(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

}

export default routes;
