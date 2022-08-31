
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

export const addTodo = async (body: any) => {
    try {
            const model = {
                loanId: body.loanId,
                title: body.title,
                date: body.date,
            };
            const todoResponce = await insert(schema.payroll, table.todos, model);
            return todoResponce;


    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateTodo = async (body: any) => {
    try {
        const model = {
            ...body,
            date:body.date,

        };
        const todoResponce = await update(schema.payroll, table.todos,{id:body.id, loanId: body.loanId}, model);
        return todoResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteTodo = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.todos}" where "id"='${body.id}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.todos}" where "loanId" = '${body.loanId}'`
        const todoResponce = await execute(query);
        return todoResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getTodoByLoanId = async (body: any) => {
    try {
        let todos:any = []
        const q1 = `SELECT * FROM "${schema.payroll}"."${table.todos}" where "loanId" = '${body.loanId}'`
        const todoResponce = await execute(q1)
        for(let i=0;i<todoResponce.length;i++){
            const q2 = `SELECT * FROM "${schema.payroll}"."${table.remarks}" where "todoId" = '${todoResponce[i]?.id}'`
            const remarks = await execute(q2)
            todos.push({...todoResponce[i], remarks})
        }
        return {todos:todos};
    } catch (err) {
        return Promise.reject(err);
    }
}
