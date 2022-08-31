

export const logFilename = () => {
    return `REQUEST-${new Date().toISOString().slice(0, 10)}.log`;
}

