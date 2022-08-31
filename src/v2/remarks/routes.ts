import {addRemark, updateRemark, getRemarkByTodoId, getAllRemarks, deleteRemark} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';

const routes = (app: Application) => {

    app.post('/v2/remark/add', (req: Request, res: Response) => {
        const body = req.body;
        console.log("body", body)
        addRemark(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/remark/update',  (req: Request, res: Response) => {
        const body = req.body;
        updateRemark(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/remark/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteRemark(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/remark/todoId',  (req: Request, res: Response) => {
        const body = req.body;
        getRemarkByTodoId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    // not working
    app.post('/v2/remark/all',  (req: Request, res: Response) => {
        const body = req.body;
        getAllRemarks(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })
}

export default routes;