

import {addTodo, updateTodo, deleteTodo, getTodoByLoanId} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';

const routes = (app: Application) => {

    app.post('/v2/todos/loanId/get',  (req: Request, res: Response) => {
        const body = req.body;
        getTodoByLoanId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/todos/add', (req: Request, res: Response) => {
        const body = req.body;
        console.log("body", body)
        addTodo(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/todos/update',  (req: Request, res: Response) => {
        const body = req.body;
        updateTodo(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/todos/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteTodo(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

}

export default routes;



