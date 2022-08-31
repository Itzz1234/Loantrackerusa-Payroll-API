
import { execute, insert, update, executeOne } from '../utils/dbHelper'
import CONSTANT from '../../constant';

const { schema, table } = CONSTANT;

// add compensation completed
export const addRemark = async (body: any) => {
    try {
         const model = {
            todoId: body.todoId,
            remark: body.remark,
            date: body.date,
        };
        const expencesResponce = await insert(schema.payroll, table.remarks, model);
        return expencesResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

// updated compensation completed
export const updateRemark = async (body: any) => {
    try {
        const model = {
            id: body.id,
            todoId: body.todoId,
            remark: body.remark,
            date: body.date,
        };
        const expencesResponce = await update(schema.payroll, table.remarks,{id: body.id,todoId: body.todoId}, model);
        return expencesResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteRemark = async (body: any) => {
    try {
        await execute(`DELETE FROM "${schema.payroll}"."${table.remarks}" where "id"='${body.id}'`)
        const query  = `SELECT * FROM ${schema.payroll}."${table.remarks}" where "todoId"='${body.todoId}'`
        const responce = await execute(query);
        return responce;
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getRemarkByTodoId = async (body: any) => {
    try {
        const query = `SELECT * FROM "${schema.payroll}"."${table.remarks}" where "todoId" = '${body.todoId}'`
        const remarksResponce = await execute(query)
        return remarksResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}

//todo
export const getAllRemarks = async (body: any) => {
    try {
        const model = {
            amount: body.amount,
            paid: body.paid,
            note: body.note,
            date: 'now()',
        };
        const expencesResponce = await insert(schema.payroll, table.remarks, model);
        return expencesResponce;
    } catch (err) {
        return Promise.reject(err);
    }
}
