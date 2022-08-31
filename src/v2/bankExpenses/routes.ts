import {addBankExpenceDetail, updateBankExpenceDetail, deleteBankExpence, getBankExpensesByLoanId, } from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';

const routes = (app: Application) => {

    app.post('/v2/bank/expenses/add', (req: Request, res: Response) => {
        const body = req.body;
        addBankExpenceDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/bank/expenses/update',  (req: Request, res: Response) => {
        const body = req.body;
        updateBankExpenceDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/bank/expenses/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteBankExpence(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/bank/expenses/loanId/get',  (req: Request, res: Response) => {
        const body = req.body;
        getBankExpensesByLoanId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })
}
export default routes;