import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class ValidationsParametersPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({ value: value, metadata: metadata });

    if (!value) throw new BadRequestException(`Value is required for type ${metadata.type}`);

    return value;
  }
}
