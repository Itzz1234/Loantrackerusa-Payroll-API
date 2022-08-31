
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

export const addBankDetail = async (body: any) => {
    try {
            const model = {
                loanId: body.loanId,
                loanAmount: body.loanAmount,
                closedDate: body.closedDate
            };
            console.log("model====", model);
            const responce = await insert(schema.payroll, table.bankDetails, model);
            console.log("res====", responce);
            return responce;
        // }

    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateBankDetail = async (body: any) => {
    try {
        const model = { loanId:body.loanId,  ...body };
        console.log("model====", model);
        const responce = await update(schema.payroll, table.bankDetails, { loanId:body.loanId }, model);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteBankDetails = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.bankDetails}" where "loanId"='${body.loanId}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.bankDetails}"`
        const responce = await execute(query);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getBankDetailByLoanId = async (body: any) => {
    try {
        const {loanId} = body
        const bank_details = await execute(`SELECT * FROM "${schema.payroll}"."${table.bankDetails}" where "loanId"='${loanId}'`)
        return {bank_details:bank_details}
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getBankDetailCount = async (body: any) => {
    try {
        const bank_details = await execute(`SELECT * FROM "${schema.payroll}"."${table.bankDetails}"`)
        return {bank_details_count:bank_details.length}
    } catch (err) {
        return Promise.reject(err);
    }
}
