import { Routes } from '@angular/router';
import { NavComponent } from './navbar/nav/nav.component';
import { ProductComponent } from './product/product/product.component';
import { CustomerComponent } from './navbar/nav/customer/customer/customer.component';
import { OrderComponent } from './navbar/nav/order/order/order.component';
import { ItemComponent } from './item/item/item.component';

export const routes: Routes = [
    {
        path: 'nav',
        component: NavComponent,
        children:[
            {path:'product',component:ProductComponent},
            {path:'customer',component:CustomerComponent},
            {path:'order',component:OrderComponent},
            {path:'item',component:ItemComponent}
        ]
    }




];
