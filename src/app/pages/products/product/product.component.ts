import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;
  @Output() addtoCartClick = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
    
  }

  onClick():void {
    this.addtoCartClick.emit(this.product);
  }

}
