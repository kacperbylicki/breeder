export interface BaseService<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IResponse> | IResponse;
}
