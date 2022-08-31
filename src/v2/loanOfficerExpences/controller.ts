
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

// add Person expence
export const addMemberExpenceDetail = async (body: any) => {
    try {
        const model = {
            amount: body.amount,
            loanId: body.loanId,
            memberId: body.memberId,
            note: body.note,
            date: body.date,
        };
        const expencesResponce = await insert(schema.payroll, table.loanOfficerExpenses, model);
        return expencesResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

// updated person expence
export const updateMemberExpenceDetail = async (body: any) => {
    try {
        const model = {
            amount: body.amount,
            loanId: body.loanId,
            memberId: body.memberId,
            note: body.note,
            date: body.date,
        };
        const expencesResponce = await update(schema.payroll, table.loanOfficerExpenses,{ memberId: body.memberId, loanId: body.loanId}, model);
        return expencesResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

// delete person expence
export const deleteMemberExpence = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.loanOfficerExpenses}" where "memberId"='${body.memberId}' and "loanId"='${body.loanId}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.loanOfficerExpenses}" where "loanId"='${body.loanId}'`
        const responce = await execute(query);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}


export const getAllMemberExpencesByLoanId=async(body:any)=>{
    try {
        const {loanId} = body
        const member_expenses = await execute(`SELECT * FROM "${schema.payroll}"."${table.loanOfficerExpenses}" where "loanId"='${loanId}'`)
        const detail  = {
            member_expenses:member_expenses
        }
        return detail;
    } catch (err) {
        return Promise.reject(err);
    }
}


