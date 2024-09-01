import { Routes } from '@angular/router';
import { ErrorComponent } from './features/auth/components/error/error.component';
import { buyerGuard } from './core/AuthGuard/buyer.guard';
import { sellerGuard } from './core/AuthGuard/seller.guard';
import { AddCarDetailsComponent } from './features/seller/components/add-car-details/add-car-details.component';
import { BrandsListComponent } from './features/admin/brands-list/brands-list.component';
import { CarListComponent } from './features/buyer/car-list/car-list.component';
import { BuyerCarListComponent } from './features/buyer/buyer-car-list/buyer-car-list.component';
import { CarDetailsComponent } from './features/buyer/car-details/car-details.component';
import { PaymentComponent } from './features/buyer/payment/payment.component';


export const routes: Routes = [
    { path: "", loadComponent: () => import('./features/home/home/home.component').then(m => m.HomeComponent) },
    { path: 'login', loadComponent: () => import("./features/auth/components/login/login.component").then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import("./features/auth/components/register/register.component").then(m => m.RegisterComponent) },
    {
        path: "buyer", children: [{
            path: '', loadComponent: () => import("./features/buyer/dashboard/dashboard.component")
                .then(m => m.DashboardComponent)
        }], canActivate: []
    },
    {
        path: "seller", children: [{
            path: 'dashboard', loadComponent: () => import("./features/seller/components/dashboard/dashboard.component")
                .then(m => m.DashboardComponent), children: [{
                    path: 'add-car', loadComponent: () => import("./features/seller/components/add-car-details/add-car-details.component")
                        .then(m => m.AddCarDetailsComponent)
                }], canActivate: []
        },
        { path: 'login', loadComponent: () => import("./features/seller/components/login/login.component").then(m => m.LoginComponent) },
        { path: 'register', loadComponent: () => import("./features/seller/components/register/register.component").then(m => m.RegisterComponent) },]
    },

    {
        path: 'admin-login', loadComponent: () => import('./features/admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
    },
    {
        path: 'admin-dashboard', loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
    },
    {
        path: 'add-brand', loadComponent: () => import('./features/admin/add-brand/add-brand.component').then(m => m.AddBrandComponent)
    }
    ,
    {
        path: 'update-brand/:id', loadComponent: () => import('./features/admin/update-brand/update-brand.component').then(m => m.UpdateBrandComponent)
    },
    {
        path: 'all-brands', component: BrandsListComponent
    },
    {
        path: 'all-categories', loadComponent: () => import('./features/admin/categories-list/categories-list.component').then(m => m.CategoriesListComponent)
    },
    {
        path: 'update-category/:id', loadComponent: () => import('./features/admin/update-category/update-category.component').then(m => m.UpdateCategoryComponent)
    },
    {
        path: 'user-update', loadComponent: () => import('./features/admin/user-curd/user-curd.component').then(m => m.UserCurdComponent)

    },
    {

        path: 'car-list', component: CarListComponent


    },
    {
        path: 'buyer-car-list', component: BuyerCarListComponent
    },
    {
        path: 'car-details/:id', component: CarDetailsComponent
    }, {
        path: 'payment', component: PaymentComponent
    },
    { path: "error", component: ErrorComponent }


]

