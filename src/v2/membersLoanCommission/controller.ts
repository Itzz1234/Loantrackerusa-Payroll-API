
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

export const addMemberCommission = async (body: any) => {
    try {
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateMemberCommission = async (body: any) => {
    try {
        const isExist = await execute(`SELECT * FROM ${schema.payroll}."${table.membersLoanCommission}" where "loanId"='${body.loanId}' and "memberId"='${body.memberId}'`)
        if(isExist?.length==0){
            const model = {
                memberId: body.memberId,
                loanId: body.loanId,
                comissionAmount: body.comissionAmount,
                comissionPercentage: body.comissionPercentage,
                isLocked: body.isLocked,
            };
            const responce = await insert(schema.payroll, table.membersLoanCommission, model);
            return responce;
        }
        else {
            const model = {loanId:body.loanId, memberId: body.memberId, ...body };
            const responce = await update(schema.payroll, table.membersLoanCommission, { loanId:body.loanId, memberId: body.memberId }, model);
            return responce;
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteMemberCommission = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.membersLoanCommission}" where "memberId"='${body.memberId}' and "loanId"='${body.loanId}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.membersLoanCommission}"`
        const responce = await execute(query);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getOfficerCommissionByMemberId = async (body: any) => {
    try {
        const {memberId} = body
        const member_commissions = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersLoanCommission}" where "memberId"='${memberId}'`)
        if(member_commissions?.length==0){
            const member_commissions_details=await execute(`SELECT * FROM "${schema.payroll}"."${table.membersDetails}" where "memberId"='${memberId}' and "isLO"='${true}'`)
            // console.log('member_commissions_details', member_commissions_details)
            return { member_commissions: member_commissions_details}
        }else {
            // console.log('member_commissions', member_commissions)
            return { member_commissions: member_commissions}
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getProcessorCommissionByMemberId = async (body: any) => {
    try {
        const {memberId} = body
        const member_commissions = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersLoanCommission}" where "memberId"='${memberId}'`)
        if(member_commissions?.length==0){
            const member_commissions_details=await execute(`SELECT * FROM "${schema.payroll}"."${table.membersDetails}" where "memberId"='${memberId}' and "isLO"='${false}'`)
            // console.log('member_commissions_details', member_commissions_details)
            return { member_commissions: member_commissions_details}
        }else {
            // console.log('member_commissions', member_commissions)
            return { member_commissions: member_commissions}
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

