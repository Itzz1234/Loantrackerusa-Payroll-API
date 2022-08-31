

import {addMemberCommission, updateMemberCommission, deleteMemberCommission, getOfficerCommissionByMemberId,getProcessorCommissionByMemberId} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';

const routes = (app: Application) => {
    app.post('/v2/members/commission/add', (req: Request, res: Response) => {
        const body = req.body;
        console.log("body", body)
        addMemberCommission(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/members/commission/update',  (req: Request, res: Response) => {
        const body = req.body;
        updateMemberCommission(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/members/commission/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteMemberCommission(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    //get commission by member id
    app.post('/v2/members/officer/commission/get',  (req: Request, res: Response) => {
        const body = req.body;
        getOfficerCommissionByMemberId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    //get commission by member id
    app.post('/v2/members/processor/commission/get',  (req: Request, res: Response) => {
        const body = req.body;
        getProcessorCommissionByMemberId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })
}

export default routes;



