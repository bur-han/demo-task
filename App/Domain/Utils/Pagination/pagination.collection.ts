import TodoEntity from "../../Todo/todo.entity"
import PaginationOptions from "./pagination.options"

class PaginatedCollection {
    data: TodoEntity[]
    totalItems: number
    perPage: number
    currentPage: number
    totalPages: any
  
    
    constructor(paginationOptions: PaginationOptions, totalItems: number, items: TodoEntity[]){
        this.perPage = paginationOptions.perpage;
        this.currentPage = paginationOptions.page;
        this.totalItems = totalItems;
        this.data = items;
    }

    getTotalPages():number {
        return Math.ceil(this.totalItems / this.perPage);
    }
    
    getPaginatedData(){
        const paginatedData = {
            totalItems: this.totalItems,
            totalPages: this.getTotalPages(),
            currentPage: this.currentPage,
            perPage: this.perPage,
            data: this.data
        }
        return paginatedData;
    }
}

export default PaginatedCollection;