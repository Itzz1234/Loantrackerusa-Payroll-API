import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

export const getCompensationByLoanId = async (body: any) => {
    try {
        const {loanId} = body
        const compensation = await execute(`SELECT *  FROM "${schema.payroll}"."${table.compensations}" where "loanId"='${loanId}'`)
        return {compensation:compensation}
    } catch (err) {
        return Promise.reject(err);
    }
}

export const addCompensation = async (body: any) => {
    try {
        const query = `SELECT * FROM ${schema.payroll}."${table.compensations}" where "loanId" = '${body.loanId}'`
        const compensationExist =  await executeOne(query)
        if(!compensationExist) {
            const model = {
                amount: body.amount,
                loanId: body.loanId,
                note: body.note,
                date: body.date,
            };
            const compensationResponce = await insert(schema.payroll, table.compensations, model);
            return compensationResponce;
        } else {
           return await updateCompensation(body)
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateCompensation = async (body: any) => {
    try {
        const model = {
            amount: body.amount,
            loanId: body.loanId,
            note: body.note,
            date: body.date,
        };
        const compensationResponce = await update(schema.payroll, table.compensations,{loanId: body.loanId}, model);
        return compensationResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteCompensation = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.compensations}" where "loanId"='${body.loanId}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.compensations}"`
        const compensationResponce = await execute(query);
        return compensationResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getCompensationlById = async (body: any) => {
    try {
        const model = {
            amount: body.amount,
            paid: body.paid,
            note: body.note,
            date: body.date,
        };
        const compensationResponce = await insert(schema.payroll, table.compensations, model);
        return compensationResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

// todo
export const getAllCompensation = async (body: any) => {
    try {
        const model = {
            amount: body.amount,
            paid: body.paid,
            note: body.note,
            date: 'now()',
        };
        const compensationResponce = await insert(schema.payroll, table.compensations, model);
        return compensationResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}