export default {
    schema:{
        payroll:'payroll',
        loan:'loan',
        auth:'auth',
        loanConfig:'loanConfig'
    },
    table:{
        auth:'auth',
        bankDetails:'bankDetails',
        bankExpenses:'bankExpenses',
        compensations:'compensations',
        membersDetails:'membersDetails',
        membersLoanCommission:'membersLoanCommission',
        loanOfficerExpenses:'loanOfficerExpenses',
        todos:'todos',
        remarks:'remarks',
        loanDetial:'loanDetail',
        loanMember:'loanMember',
        user:'user',
        designation:'designation',
        lender:'lender',
        borrower:'borrower',
        borrowerLoan:'borrowerLoan'
    },
    apiStatus: {
        success: 200,
        twoZeroFour: 204,
        notFound: 404,
        failed: 500,
        alreadyExists: 409,
        validationError: 400
    }
}