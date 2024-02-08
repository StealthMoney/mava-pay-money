export const stringifyError = (
    err: any,
    customMessage: string = "Something went wrong"
) => {
    let errMessage
    if (err instanceof Error) errMessage = err.message
    else errMessage = customMessage
    return JSON.stringify({
        status: "Error",
        reason: errMessage
    })
}
