import logger from '../logger';
import controllers from '../controllers';
import Services from '../services';
import express, { ErrorRequestHandler, Application, Request, Response, NextFunction } from 'express';
import { OpenApiRequest } from 'express-openapi-validator/dist/framework/types';

function handleError(error: any, request: Request, response: Response, next: NextFunction): void {
  logger.error(error);
  const code = error.code || 400;
  response.status(code);
  next(JSON.stringify({ code, error }));
}

/**
 * The purpose of this route is to collect the request variables as defined in the
 * OpenAPI document and pass them to the handling controller as another Express
 * middleware. All parameters are collected in the requet.swagger.values key-value object
 *
 * The assumption is that security handlers have already verified and allowed access
 * to this path. If the business-logic of a particular path is dependant on authentication
 * parameters (e.g. scope checking) - it is recommended to define the authentication header
 * as one of the parameters expected in the OpenAPI/Swagger document.
 *
 *  Requests made to paths that are not in the OpernAPI scope
 *  are passed on to the next middleware handler.
 * @returns {Function}
 */
function openApiRouter() {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      if ((request as any).openapi === undefined || (request as any).openapi.schema === undefined) {
        console.log("hi1");
        next();
        return;
      }
      const requestOpenApiSchema: any = (request as any).openapi.schema;
      const controllerName: any = requestOpenApiSchema['x-openapi-router-controller'];
      const operationId: any = requestOpenApiSchema['operationId'];

      if (!(controllerName instanceof String && operationId instanceof String)) {
        const error = {
          message: `Invalid definition for controller and operation, url: ${request.url}`,
          code: 500
        }
        handleError(error, request, response, next);
      } else {
        await controllers(controllerName as string, operationId as string, request, response); // TODO: better
      }

    } catch (error) {
      console.error(error);
      const err = { code: 500, error: error.message };
      handleError(err, request, response, next);
    }
  };
}

export default openApiRouter;
