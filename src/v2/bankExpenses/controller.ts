import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

export const addBankExpenceDetail = async (body: any) => {
    try {
        const model = {
            amount: body.amount,
            loanId: body.loanId,
            note: body.note,
            date: body.date,
        };
        const expencesResponce = await insert(schema.payroll, table.bankExpenses, model);
        return expencesResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateBankExpenceDetail = async (body: any) => {
    try {
        const model = {
            amount: body.amount,
            loanId: body.loanId,
            note: body.note,
            date: body.date,
        };
        const expencesResponce = await update(schema.payroll, table.bankExpenses,{ id: body.id, loanId: body.loanId}, model);
        return expencesResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteBankExpence = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.bankExpenses}" where "id"='${body.id}' and "loanId"='${body.loanId}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.bankExpenses}" where "loanId"='${body.loanId}'`
        const responce = await execute(query);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getBankExpensesByLoanId = async (body: any) => {
    try {
        const {loanId} = body
        const bank_expences = await execute(`SELECT * FROM "${schema.payroll}"."${table.bankExpenses}" where "loanId"='${loanId}'`)
        return {bank_expences:bank_expences}
    } catch (err) {
        return Promise.reject(err);
    }
}
