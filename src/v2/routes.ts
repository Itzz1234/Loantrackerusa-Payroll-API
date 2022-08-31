import bankExpenses from './bankExpenses/routes'
import bankDetails from './bankDetails/routes'
import membersDetails from './membersDetails/routes'
import loanOfficerExpenses from './loanOfficerExpences/routes'
import compensation from './compensations/routes'
import todo from './todos/routes'
import remark from './remarks/routes'
import membersLoanCommission from './membersLoanCommission/routes'
import loanDetail from './loanDetail/routes'
import loanMember from './loanMemberInfo/routes'
import getAll from './get/routes'
import express, {Application, Request, Response} from 'express';

export default (app:Application)=>{
    bankDetails(app)
    bankExpenses(app)
    membersDetails(app)
    membersLoanCommission(app)
    loanOfficerExpenses(app)
    compensation(app)
    todo(app)
    remark(app)
    loanDetail(app)
    loanMember(app)
    getAll(app)
}