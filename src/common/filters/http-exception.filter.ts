import { ArgumentsHost, ExceptionFilter, HttpException, Logger } from '@nestjs/common';

export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = exception instanceof HttpException ? exception.getStatus() : 500;

    const message = exception instanceof HttpException ? exception.message : exception.message;

    const error = {
      timestmap: new Date().toISOString(),
      path: request.url,
      error: message,
    };

    this.logger.error(error);

    response.status(statusCode).json(error);
  }
}
