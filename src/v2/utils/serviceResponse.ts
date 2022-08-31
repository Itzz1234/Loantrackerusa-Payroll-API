export default (body: any) => {
    const response = {
        status: body.status,
        result: body.result ? body.result : null,
        error: body.error ? body.error.message : null,
    }
    return response;
};