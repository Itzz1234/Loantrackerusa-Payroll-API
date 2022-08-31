

import {addLoanDetail, updateLoanDetail, deleteLoanDetails, getLoansDetailBetweenDates, getLoansCount} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';


const routes = (app: Application) => {

    app.post('/v2/loan/details/count',  (req: Request, res: Response) => {
        const body = req.body;
        getLoansCount(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/loan/details/between',  (req: Request, res: Response) => {
        const body = req.body;
        getLoansDetailBetweenDates(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/loan/details/add', (req: Request, res: Response) => {
        const body = req.body;
        console.log("body", body)
        addLoanDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/loan/details/update',  (req: Request, res: Response) => {
        const body = req.body;
        updateLoanDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/loan/details/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteLoanDetails(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })
}

export default routes;



