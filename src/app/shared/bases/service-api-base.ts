import {ServiceBase} from './service-base';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ValidateAttributeDto} from '../dto/validate-attribute.dto';

export abstract class ServiceApiBase<T> extends ServiceBase<T> {

  public getValidateAttributes(): Observable<Array<ValidateAttributeDto>> {
    return this.getByArrayParams('validate-attributes', null, null)
      .pipe(map(response => this.handlerResponse(response)));
  }

  public getlist(
    filter: Array<string>,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    const params = new Array<string>();
    params['page'] = pageNumber;
    params['count'] = pageSize;
    for (const i in filter) {
      params[i] = filter[i];
    }
    return this.getByArrayParams(null, params, null)
      .pipe(map(response => this.handlerResponse(response)));
  }

  public getAll(): Observable<T[]> {
    return this.getByArrayParams(null, null, null)
      .pipe(map(response => this.handlerResponse(response)));
  }

  public postJson(body: any): Observable<any> {
    const optionsHeaders = new Array<string>();
    optionsHeaders['Content-Type'] = this.getContentTypeRequestWs();
    return this.post(body, null, this.parseArrayToHttpHeaders(optionsHeaders))
      .pipe(map(response => this.handlerResponse(response)));
  }

  public getById(id: string): Observable<T> {
    return this.getByArrayParams(id, null, null)
      .pipe(map(response => this.handlerResponse(response)));
  }

}
