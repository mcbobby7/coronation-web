import {
  Injectable,
  ComponentFactoryResolver,
  TemplateRef,
  Type,
  Injector,
  Inject,
  ApplicationRef,
  OnDestroy,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MegaModalComponent } from '../../shared/components/mega-modal/mega-modal.component';

export type Content<T> = string | TemplateRef<T> | Type<T>;
export interface DataComponent {
  data: any;
}

@Injectable({
  providedIn: 'root',
})

export class MegaModalService {

  private modalNode;
  private componentRef;

  // tslint:disable-next-line: max-line-length
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  openModal<T>(
    content: Content<T>,
    type = 'modal',
    data?,
    manualClose: boolean = false
  ) {
    const factory = this.resolver.resolveComponentFactory(
      type === 'modal'
        ? MegaModalComponent
        : type === 'drawer'
        ? MegaModalComponent
        : MegaModalComponent
    );

    const ngContent = this.resolveNgContent(content, data);
    this.componentRef = factory.create(this.injector, ngContent);
    this.appRef.attachView(this.componentRef.hostView);

    this.componentRef.hostView.detectChanges();

    const { nativeElement } = this.componentRef.location;
    this.modalNode = nativeElement;

    if (!manualClose) {
      nativeElement.addEventListener('click', (e) => {
        if (type === 'drawer') {
          if (e.target.classList.contains('drawer')) {
            this.document.body.removeChild(nativeElement);
            this.document.body.style.overflow = '';
          }
        } else {
          if (e.target.classList.contains('theModal')) {
            this.document.body.removeChild(nativeElement);
            this.document.body.style.overflow = '';
          }
        }
      });

      this.document.body.addEventListener(
        'keyup',
        (e) => {
          if (e.key === 'Escape' || e.key === 'Ecs') {
            this.document.body.removeChild(nativeElement);
            this.document.body.style.overflow = '';
          }
        },
        { once: true }
      );

      window.addEventListener(
        'popstate',
        () => {
          if (this.document.body.contains(nativeElement)) {
            this.document.body.removeChild(nativeElement);
            this.document.body.style.overflow = '';
          }
        },
        { once: true }
      );
    }

    this.document.body.appendChild(nativeElement);
    this.document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.document.body.removeChild(this.modalNode);
    this.document.body.style.overflow = '';
  }

  private resolveNgContent<T>(content: Content<T>, data?) {
    if (typeof content === 'string') {
      const element = this.document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      return [viewRef.rootNodes];
    }

    const factory = this.resolver.resolveComponentFactory(content);
    const componentRef = factory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    ((componentRef.instance as unknown) as DataComponent).data = data;
    return [[componentRef.location.nativeElement]];
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
    }
  }
}
