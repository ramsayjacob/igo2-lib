import {
  Directive,
  Self,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService, LanguageService } from '@igo2/core';

import { Context, DetailedContext } from '../shared/context.interface';
import { ContextService } from '../shared/context.service';
import { ContextEditComponent } from './context-edit.component';

@Directive({
  selector: '[igoContextEditBinding]'
})
export class ContextEditBindingDirective implements OnInit, OnDestroy {
  private component: ContextEditComponent;
  private editedContext$$: Subscription;

  @HostListener('submitForm', ['$event'])
  onEdit(context: Context) {
    const id = this.component.context.id;
    this.contextService.update(id, context).subscribe(() => {
      const translate = this.languageService.translate;
      const message = translate.instant('igo.geoContext.context.dialog.saveMsg', {
        value: context.title || this.component.context.title
      });
      const title = translate.instant('igo.geoContext.context.dialog.saveTitle');
      this.messageService.success(message, title);
    });
  }

  constructor(
    @Self() component: ContextEditComponent,
    private contextService: ContextService,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {
    this.component = component;
  }

  ngOnInit() {
    this.editedContext$$ = this.contextService.editedContext$.subscribe(
      context => this.handleEditedContextChange(context)
    );
  }

  ngOnDestroy() {
    this.editedContext$$.unsubscribe();
  }

  private handleEditedContextChange(context: DetailedContext) {
    this.component.context = context;
  }
}
