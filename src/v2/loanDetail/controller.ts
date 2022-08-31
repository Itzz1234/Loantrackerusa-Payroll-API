
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

const member=`"${schema.loan}"."${table.loanMember}"`
const loan=`"${schema.loan}"."${table.loanDetial}"`

export const getLoansCount = async (body: any) => {
    try {
        const {from, to, id, isLO} = body

        let loan_details_count=[]
        if(id == null){
            loan_details_count = await execute(`SELECT COUNT(*) FROM "${schema.loan}"."${table.loanDetial}" where "closedOn">='${from}' and "closedOn"<='${to}'`)
        } else {
            if(isLO){
                loan_details_count = await execute(`
                    SELECT COUNT(*)
                    FROM ${loan}
                    INNER JOIN ${member}
                    ON ${loan}."id" = ${member}."loanDetailId"
                    WHERE ${loan}."closedOn">='${from}'
                    AND ${loan}."closedOn"<='${to}'
                    AND ${member}."memberId"='${id}'
                    AND ${member}."isLO"='${true}'
                `)
            } else {
                loan_details_count = await execute(`
                    SELECT COUNT(*)
                    FROM ${loan}
                    INNER JOIN ${member}
                    ON ${loan}."id" = ${member}."loanDetailId"
                    WHERE ${loan}."closedOn">='${from}'
                    AND ${loan}."closedOn"<='${to}'
                    AND ${member}."memberId"='${id}'
                    AND ${member}."isProcessor"='${true}'
                `)
            }
        }
        return {loan_details_count:loan_details_count[0].count}
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getLoansDetailBetweenDates = async (body: any) => {
    try {
        const {from, to, page, id, isLO} = body
        const limit=15
        const offset=(page)*limit
        let loan_details=[]
        if(id==null){
            loan_details = await execute(`SELECT * FROM "${schema.loan}"."${table.loanDetial}" where "closedOn" IS NOT NULL and "closedOn">='${from}' and "closedOn"<='${to}' limit '${limit}' offset '${offset}'`)
        }else {
            if(isLO){
                loan_details = await execute(`
                    SELECT *
                    FROM ${loan}
                    INNER JOIN ${member}
                    ON ${loan}."id" = ${member}."loanDetailId"
                    WHERE ${loan}."closedOn" IS NOT NULL
                    AND ${loan}."closedOn">='${from}'
                    AND ${loan}."closedOn"<='${to}'
                    AND ${member}."memberId"='${id}'
                    AND ${member}."isLO"='${true}'
                    LIMIT '${limit}' OFFSET '${offset}'
                `)
            }else {
                loan_details = await execute(`
                    SELECT *
                    FROM ${loan}
                    INNER JOIN ${member}
                    ON ${loan}."id" = ${member}."loanDetailId"
                    WHERE ${loan}."closedOn" IS NOT NULL
                    AND ${loan}."closedOn">='${from}'
                    AND ${loan}."closedOn"<='${to}'
                    AND ${member}."memberId"='${id}'
                    AND ${member}."isProcessor"='${true}'
                    LIMIT '${limit}' OFFSET '${offset}'
                `)
            }
        }
        // SELECT * FROM "${schema.loan}"."${table.loanDetial}" where "closedOn" IS NOT NULL and "closedOn">='${from}' and "closedOn"<='${to}' limit '${limit}' offset '${offset}'

        // SELECT * FROM loan."loanDetail" INNER JOIN loan."loanMember" ON loan."loanDetail".id = loan."loanMember".loanDetailId WHERE loan."loanDetail".closedOn IS NOT NULL AND loan."loanDetail".closedOn >= 05/18/2022 AND loan."loanDetail".closedOn<= 08/30/2022 AND loan."loanMember".memberId=7;
        // console.log('response data::: ', loan_details?.length)
        return {loan_details:loan_details, count:loan_details?.length}
    } catch (err) {
        return Promise.reject(err);
    }
}

export const addLoanDetail = async (body: any) => {
    try {
            const model = {
                closedOn: body.from,
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

export const updateLoanDetail = async (body: any) => {
    try {
        const model = { loanId:body.loanId,  ...body };
        console.log("model====", model);
        const responce = await update(schema.payroll, table.bankDetails, { loanId:body.loanId }, model);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteLoanDetails = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.bankDetails}" where "loanId"='${body.loanId}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.bankDetails}"`
        const responce = await execute(query);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}

