
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

// not in use anymore - replaced in join in /get/all_data/loanId
export const getLoanOfficerInfo = async (body: any) => {
    try {
        const {loanId} = body
        const loan_officer_exist = await execute(`SELECT * FROM "${schema.loan}"."${table.loanMember}" where "loanDetailId"='${loanId}' and "isLO"='${true}'`)
        if(loan_officer_exist?.length>0){
            const loan_officer_info = await execute(`SELECT * FROM "${schema.auth}"."${table.user}" where "id"='${loan_officer_exist[0]?.memberId}'`)
            // console.log('officer response data::: ', loan_officer_info)
            return {loan_officer_info: loan_officer_info}
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

// not in use anymore - replaced in join in /get/all_data/loanId
export const getLoanProcessorInfo = async (body: any) => {
    try {
        const {loanId} = body
        const loan_processor_exist = await execute(`SELECT * FROM "${schema.loan}"."${table.loanMember}" where "loanDetailId"='${loanId}' and "isProcessor"='${true}'`)
        if(loan_processor_exist?.length>0){
            const loan_processor_info =await execute(`SELECT * FROM "${schema.auth}"."${table.user}" where "id"='${loan_processor_exist[0]?.memberId}'`)
            // console.log('processor response data::: ', loan_processor_info)
            return {loan_processor_info: loan_processor_info}
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

