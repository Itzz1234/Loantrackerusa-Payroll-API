

import {addCompensation, updateCompensation, getCompensationByLoanId, getCompensationlById, getAllCompensation, deleteCompensation} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';

const routes = (app: Application) => {

    app.post('/v2/compensation/loanId/get',  (req: Request, res: Response) => {
        const body = req.body;
        getCompensationByLoanId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/compensation/add', (req: Request, res: Response) => {
        const body = req.body;
        console.log("body", body)
        addCompensation(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/compensation/update',  (req: Request, res: Response) => {
        const body = req.body;
        updateCompensation(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/compensation/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteCompensation(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    // not working
    app.post('/v2/compensation/:id',  (req: Request, res: Response) => {
        const body = req.body;
        getCompensationlById(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    // not working
    app.post('/v2/compensation',  (req: Request, res: Response) => {
        const body = req.body;
        getAllCompensation(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

}

export default routes;
