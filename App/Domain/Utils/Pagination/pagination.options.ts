class PaginationOptions {
    public page: number;
    public perpage: number;

    constructor(page: number = 1, perpage: number = 10){
        this.page = page;
        this.perpage = perpage;
    }

    limit() {
        return this.perpage;
    }

    offset() {
        return (this.page -1) * this.limit();
    }
}

export default PaginationOptions;