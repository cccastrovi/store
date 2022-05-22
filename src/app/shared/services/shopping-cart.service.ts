import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable} from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService {

    products: Product[] = [];

    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubjet = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

    get totalAction$(): Observable<number> {
        return this.totalSubjet.asObservable();
    }

    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }

    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable();
    }

    private addToCart(product: Product): void {
        const isProductInCart = this.products.find(({id}) => id === product.id);

        if (isProductInCart) {
            isProductInCart.qty += 1;
        }else {
            this.products.push({...product, qty: 1});
        }
        
        this.cartSubject.next(this.products);
    }

    private quantityProducts(): void {
        const quantity = this.products.reduce((acc, prod) => acc += prod.qty, 0);
        this.quantitySubject.next(quantity)
    }

    private calcTotal(): void {
        const total = this.products.reduce((acc, prod) => acc += (prod.price * prod.qty), 0);
        this.totalSubjet.next(total);
    }

    updateCart(product: Product): void {
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
    }

    resertCart(): void {
        this.cartSubject.next([]);
        this.totalSubjet.next(0);
        this.quantitySubject.next(0);
        this.products = [];
    }
}
