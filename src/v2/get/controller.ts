
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

export const getAllData = async (body: any) => {
    try {
        const {loanId} = body
        // let loan_officer_info:any=[], loa_commissions:any=[]

        const member=`"${schema.loan}"."${table.loanMember}"`
        const user=`"${schema.auth}"."${table.user}"`
        const commission=`"${schema.payroll}"."${table.membersLoanCommission}"`
        const detail=`"${schema.payroll}"."${table.membersDetails}"`
        const borrower=`"${schema.auth}"."${table.borrower}"`

        // const loan_officer_info= await execute(`
        //     SELECT * FROM ${member}
        //     INNER JOIN ${user}
        //     ON ${member}."loanDetailId"='${loanId}'
        //     and
        //     ${member}."isLO"='${true}'
        //     and ${user}."id"=${member}."memberId"
        // `)
        const loan_officer_info= await execute(`
            SELECT ${user}.*, ${commission}.*
            FROM ${member}
            INNER JOIN ${user}
            ON ${member}."loanDetailId"='${loanId}'
            AND
            ${member}."isLO"='${true}'
            AND
            ${user}."id"=${member}."memberId"
            LEFT JOIN ${commission}
            ON ${user}."id" = ${commission}."memberId"
            AND ${commission}."loanId"='${loanId}'
        `)

        let loa_commissions:any=[]
        if(loan_officer_info[0]?.memberId==null && loan_officer_info[0]?.comissionAmount==null){
            loa_commissions= await execute(`
                SELECT ${detail}.*
                FROM ${detail}
                where "memberId"=${loan_officer_info[0]?.id} AND "isLO"=${true}
            `)
        }

        // if(loan_officer_info?.length>0){
        //     loa_commissions = await execute(`SELECT * FROM ${commission} where "memberId"='${loan_officer_info[0]?.id}' and "loanId"='${loanId}'`)
        //     if(loa_commissions?.length==0){
        //         loa_commissions = await execute(`SELECT * FROM ${detail} where "memberId"='${loan_officer_info[0]?.id}' and "isLO"='${true}'`)
        //     }
        // }

        // const loan_officer_exist = await execute(`SELECT * FROM "${schema.loan}"."${table.loanMember}" where "loanDetailId"='${loanId}' and "isLO"='${true}'`)
        // if(loan_officer_exist?.length>0){
        //     loan_officer_info =await execute(`SELECT * FROM "${schema.auth}"."${table.user}" where "id"='${loan_officer_exist[0]?.memberId}'`)
        //     if(loan_officer_info?.length>0){
        //         // loa_commissions = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersLoanCommission}" where "memberId"='${loan_officer_info[0]?.id}'`)
        //         loa_commissions = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersLoanCommission}" where "memberId"='${loan_officer_info[0]?.id}' and "loanId"='${loanId}'`)
        //         if(loa_commissions?.length == 0) {
        //             loa_commissions = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersDetails}" where "memberId"='${loan_officer_info[0]?.id}' and "isLO"='${true}'`)
        //             if(loa_commissions?.length == 0) {
        //                 loa_commissions.push({
        //                     comissionAmount: 0,
        //                     comissionPercentage: 0
        //                 })
        //             }
        //         }
        //     }
        // }

        // const loan_processor_info= await execute(`
        //     SELECT * FROM ${member}
        //     INNER JOIN ${user}
        //     ON ${member}."loanDetailId"='${loanId}'
        //     and
        //     ${member}."isProcessor"='${true}'
        //     and ${user}."id"=${member}."memberId"
        // `)
        // let processor_commissions:any=[]
        // if(loan_officer_info?.length>0){
        //     processor_commissions = await execute(`SELECT * FROM ${commission} where "memberId"='${loan_officer_info[0]?.id}' and "loanId"='${loanId}'`)
        //     if(processor_commissions?.length==0){
        //         processor_commissions = await execute(`SELECT * FROM ${detail} where "memberId"='${loan_officer_info[0]?.id}' and "isLO"='${false}'`)
        //     }
        // }

        const loan_processor_info= await execute(`
            SELECT * FROM ${member}
            INNER JOIN ${user}
            ON ${member}."loanDetailId"='${loanId}'
            and
            ${member}."isProcessor"='${true}'
            and ${user}."id"=${member}."memberId"
            LEFT JOIN ${commission}
            ON ${user}."id" = ${commission}."memberId"
            AND ${commission}."loanId"='${loanId}'
        `)

        let processor_commissions:any=[]
        if(loan_processor_info[0]?.memberId==null && loan_processor_info[0]?.comissionAmount==null){
            processor_commissions= await execute(`
                SELECT ${detail}.*
                FROM ${detail}
                where "memberId"=${loan_processor_info[0]?.id} AND "isLO"=${false}
            `)
        }

        // let loan_processor_info:any=[], processor_commissions:any=[]
        // const loan_processor_exist = await execute(`SELECT * FROM "${schema.loan}"."${table.loanMember}" where "loanDetailId"='${loanId}' and "isProcessor"='${true}'`)
        // if(loan_processor_exist?.length>0){
        //     loan_processor_info =await execute(`SELECT * FROM "${schema.auth}"."${table.user}" where "id"='${loan_processor_exist[0]?.memberId}'`)
        //     if(loan_processor_info?.length>0){
        //         // processor_commissions = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersLoanCommission}" where "memberId"='${loan_processor_info[0]?.id}'`)
        //         processor_commissions = await execute(`SELECT * FROM "${schema.payroll}"."${table.membersLoanCommission}" where "memberId"='${loan_processor_info[0]?.id}' and "loanId"='${loanId}'`)
        //         if(processor_commissions?.length==0){
        //             processor_commissions=await execute(`SELECT * FROM "${schema.payroll}"."${table.membersDetails}" where "memberId"='${loan_processor_info[0]?.id}' and "isLO"='${false}'`)
        //         }
        //     }
        // }

        let bank_details = []
        const loanDetail = await execute(`SELECT * FROM "${schema.loan}"."${table.loanDetial}" where "id"='${loanId}'`)
        if (loanDetail?.length > 0 && loanDetail[0]?.lenderId!=null) {
            bank_details = await execute(`SELECT * FROM "${schema.loanConfig}"."${table.lender}" where "id"='${loanDetail[0].lenderId}'`)
        }

        if(bank_details?.length==0){
            bank_details?.push({
                name: 'N/A',
            })
        }
        let compensation = await execute(`SELECT *  FROM "${schema.payroll}"."${table.compensations}" where "loanId"='${loanId}'`)
        if (compensation?.length == 0) {
            compensation?.push({
                amount: 0,
                note: '',
                date:''
            })
        }

        const bank_expenses = await execute(`SELECT * FROM "${schema.payroll}"."${table.bankExpenses}" where "loanId"='${loanId}'`)
        const loan_officer_expenses = await execute(`SELECT * FROM "${schema.payroll}"."${table.loanOfficerExpenses}" where "loanId"='${loanId}'`)

        const borrowerLoan= `"${schema.auth}"."${table.borrowerLoan}"`
        const loan= `"${schema.loan}"."${table.loanDetial}"`

        // const borrower_details= await execute(`SELECT '${borrower}'."name" FROM ${borrower} where "id"='${loanId}'`)
        const borrower_info= await execute(`
            SELECT * FROM ${borrower}
            INNER JOIN ${borrowerLoan}
            ON ${borrower}."id"=${borrowerLoan}."borrowerId"
            INNER JOIN ${loan}
            ON ${loan}."id" = ${borrowerLoan}."loanId"
            AND ${loan}."id"='${loanId}'
        `)

        let todos:any = []
        const q1 = `SELECT * FROM "${schema.payroll}"."${table.todos}" where "loanId" = '${body.loanId}'`
        const todoResponce = await execute(q1)
        for(let i=0;i<todoResponce.length;i++){
            const q2 = `SELECT * FROM "${schema.payroll}"."${table.remarks}" where "todoId" = '${todoResponce[i]?.id}'`
            const remarks = await execute(q2)
            todos.push({...todoResponce[i], remarks})
        }

        const all_data={
            loan_officer_info:loan_officer_info,
            loan_processor_info:loan_processor_info,
            bank_details: bank_details,
            compensation: compensation,

            bank_expenses: bank_expenses,
            loan_officer_expenses:loan_officer_expenses,
            todos:todos,
            loa_commissions:loa_commissions,
            processor_commissions:processor_commissions,
            borrower_info:borrower_info
         }

        return all_data

    } catch (err) {
        return Promise.reject(err);
    }

}

