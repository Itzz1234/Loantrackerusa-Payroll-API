

import {addMemberDetail, updateMemberDetail, deleteMemberDetails, getLoanOfficersMembers, getLoanProcessorMembers, getMemberDetailsByMemberId} from './controller'
import serviceResponse from '../utils/serviceResponse';
import CONSTANT from '../../constant';
import {Application, Request, Response} from 'express';

const routes = (app: Application) => {

    app.get('/v2/members/officers/get',  (req: Request, res: Response) => {
        const body = req.body;
        getLoanOfficersMembers(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.get('/v2/members/processors/get',  (req: Request, res: Response) => {
        const body = req.body;
        getLoanProcessorMembers(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    // app.post('/v2/members/details/add', (req: Request, res: Response) => {
    //     const body = req.body;
    //     console.log("body", body)
    //     addMemberDetail(body).then((result: any) => {
    //         res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
    //     }).catch((error: any) => {
    //         res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
    //     })
    // })

    app.post('/v2/members/details/update',  (req: Request, res: Response) => {
        const body = req.body;
        updateMemberDetail(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    app.post('/v2/members/details/delete',  (req: Request, res: Response) => {
        const body = req.body;
        deleteMemberDetails(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })

    // not is use anymore - query updated with join in /members/officers/get
    app.post('/v2/members/details/id',  (req: Request, res: Response) => {
        const body = req.body;
        getMemberDetailsByMemberId(body).then((result: any) => {
            res.send(serviceResponse({ result, status: CONSTANT.apiStatus.success }));
        }).catch((error: any) => {
            res.send(serviceResponse({ error, status: CONSTANT.apiStatus.failed }));
        })
    })
}

export default routes;



