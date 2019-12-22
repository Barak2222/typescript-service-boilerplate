import logger from '../logger';
import { Request, Response, NextFunction } from 'express';

// import {OpenApiRequest} from '../interfaces/OpenApi';
import { OpenAPIV3, OpenApiRequest, OpenApiRequestMetadata } from 'express-openapi-validator/dist/framework/types';
import { ResponseDefinition, HttpError } from './types';
// import { OpenAPI } from 'openapi-types';


// TODO: use import { OpenApiRequest, OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';

export default class Controller {
  static sendResponse(response: Response, wrappedResponseObject: ResponseDefinition) {
    response.status(wrappedResponseObject.statusCode);
    if (wrappedResponseObject.isPayloadDefined()) {
      response.json(wrappedResponseObject.payload);
    } else {
      response.end();
    }
  }

  static sendError(response: Response, error: HttpError) {
    response.status(error.statusCode);
    response.json(error.errorObject);
  }

  static exceptionHandler(response: Response, exception: any) {
    // TODO: handle exceptions
    this.sendError(response, new HttpError(exception));
  }

  static collectRequestParams(request: OpenApiRequest) {
    const getPathParams: () => {} = () => {
      const opnApiObjUnsafe: {} | OpenApiRequestMetadata | undefined = request.openapi
      if (opnApiObjUnsafe === {} || opnApiObjUnsafe === undefined) {
        return {}
      } else {
        const s: string[] = (opnApiObjUnsafe as OpenApiRequestMetadata).pathParams
        return []// TODO
      }
    }

    // TODO: add header params
    const requestParams = {
      body: request.body,
      query: request.query,
      path: getPathParams()
    };
  }

  static async handleRequest<T>(
    request: Request,
    response: Response,
    serviceOperation: () => Promise<T>,
    resultWrapper: (t: T) => ResponseDefinition) {

    try {
      const operationData: T = await serviceOperation();
      const wrappedResultData = resultWrapper(operationData)
      Controller.sendResponse(response, wrappedResultData);
    } catch (error) {
      Controller.exceptionHandler(response, error);
    }
  }
}
