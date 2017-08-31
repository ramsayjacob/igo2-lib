import { Component, Input } from '@angular/core';

import { Catalog } from '../shared/catalog.interface';

@Component({
  selector: 'igo-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.styl']
})
export class CatalogItemComponent {
  public color: string = 'primary';

  @Input()
  get catalog(): Catalog { return this._catalog; }
  set catalog(value: Catalog) {
    this._catalog = value;
  }
  private _catalog: Catalog;

}
