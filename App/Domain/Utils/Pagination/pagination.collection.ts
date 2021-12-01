import PaginationOptions from "./pagination.options"

class PaginatedCollection<T> {
    items: T[]
    totalItems: number
    perPage: number
    currentPage: number
    
    constructor(paginationOptions: PaginationOptions, totalItems: number, items: T[]){
        this.perPage = paginationOptions.perpage;
        this.currentPage = paginationOptions.page;
        this.totalItems = totalItems;
        this.items = items;
    }

    get totalPages():number {
        return Math.ceil(this.totalItems / this.perPage);
    }
    
    getPaginatedData(){
        const paginatedData = {
            totalItems: this.totalItems,
            totalPages: this.totalPages,
            currentPage: this.currentPage,
            perPage: this.perPage,
            data: this.items
        }
        return paginatedData;
    }
}

export default PaginatedCollection;