import {BreadCrumb} from '../models/binding/breadcrumb';

export abstract class CommomBase {

  breadCrumb: BreadCrumb = new BreadCrumb();

  public receiverBreadcrumb(breadCrumb: BreadCrumb) {
    this.breadCrumb = breadCrumb;
  }

}
