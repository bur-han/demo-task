class CustomError extends Error {
    public statusCode: number
    constructor(statusCode:number, message:string)
    {
        super(message)
        this.name = 'CustomError'
        this.statusCode = statusCode
    }

}
export default CustomError
