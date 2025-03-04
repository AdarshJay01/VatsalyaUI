import { item } from "./item"

export interface Order{
    id:string,
    custId:string,
    name:string,
    orderdate:string,
    addr:string,
    price:number,
    products:item[]


}