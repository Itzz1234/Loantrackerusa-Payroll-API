

import {addBankDetail, updateBankDetail, deleteBankDetails, getBankDetailByLoanId, getBankDetailCount} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';


const routes = (app: Application) => {

    app.post('/v2/bank/details/add', (req: Request, res: Response) => {
        const body = req.body;
        console.log("body", body)
        addBankDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/bank/details/update',  (req: Request, res: Response) => {
        const body = req.body;
        updateBankDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/bank/details/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteBankDetails(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/bank/details/loanId',  (req: Request, res: Response) => {
        const body = req.body;
        getBankDetailByLoanId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.get('/v2/bank/details/count',  (req: Request, res: Response) => {
        const body = req.body;
        getBankDetailCount(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })
}

export default routes;



