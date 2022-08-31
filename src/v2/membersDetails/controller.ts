
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

const user=`"${schema.auth}"."${table.user}"`
const loanMember=`"${schema.loan}"."${table.loanMember}"`
const detail=`"${schema.payroll}"."${table.membersDetails}"`

export const getLoanOfficersMembers = async (body: any) => {
    try {
        const loan_officers_list = await execute(`
            SELECT DISTINCT ${user}."id", ${user}."name", ${detail}."comissionPercentage" FROM ${user}
            INNER JOIN ${loanMember}
            ON ${user}."id" = ${loanMember}."memberId"
            AND ${loanMember}."isLO"=${true}
            LEFT JOIN ${detail}
            ON ${loanMember}."memberId"= ${detail}."memberId"
            ORDER BY ${user}."id"
        `)
        return {loan_officers_list: loan_officers_list};
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getLoanProcessorMembers = async (body: any) => {
    try {
        const loan_processors_list = await execute(`
            SELECT DISTINCT ${user}."id", ${user}."name", ${detail}."comissionAmount" FROM ${user}
            INNER JOIN ${loanMember}
            ON ${user}."id" = ${loanMember}."memberId"
            AND ${loanMember}."isProcessor"=${true}
            LEFT JOIN ${detail}
            ON ${loanMember}."memberId"= ${detail}."memberId"
            ORDER BY ${user}."id"
        `)
        return {loan_processors_list: loan_processors_list};
    } catch (err) {
        return Promise.reject(err);
    }
}


export const addMemberDetail = async (body: any) => {
    try {
        const model = {
            memberId: body.memberId,
            comissionAmount: body.comissionAmount,
            comissionPercentage: body.comissionPercentage,
            isLO: body.isLO,
        };
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateMemberDetail = async (body: any) => {
    try {
        const memberId= body.memberId
        //
        const isExist = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersDetails}" where "memberId"='${memberId}'`)
        if(isExist?.length==0){
            const model = {
                memberId: body.memberId,
                comissionAmount: body.comissionAmount,
                comissionPercentage: body.comissionPercentage,
                isLO: body.isLO,
            };
            const responce = await insert(schema.payroll, table.membersDetails, model);
            return responce;
        }else {
            const model = { ...body };
            const responce = await update(schema.payroll, table.membersDetails, { memberId: body.memberId }, model);
            return responce;
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteMemberDetails = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.membersDetails}" where "memberId"= '${body.memberId}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.membersDetails}"`
        const responce = await execute(query);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}


// not is use anymore - query updated with join in getLoanOfficersMembers
export const getMemberDetailsByMemberId = async (body: any) => {
    try {
        const {memberId} = body
        const members_details = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersDetails}" where "memberId"='${memberId}'`)
        return {members_details: members_details};
    } catch (err) {
        return Promise.reject(err);
    }
}

