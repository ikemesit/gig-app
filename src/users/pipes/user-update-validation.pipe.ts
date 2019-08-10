import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UpdateFields } from '../constants/update-fields.constant';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserUpdateValidationPipe implements PipeTransform {
  // TODO: Use database persistence instead
  allowedFields: string[] = [
    UpdateFields.ADDRESS,
    UpdateFields.EMAIL,
    UpdateFields.PHONE,
  ];
  transform(value: UpdateUserDto, metadata: ArgumentMetadata) {
    for (const entry in value) {
      if (!this.canUpdateField(entry)) {
        delete value[entry];
      }
    }
    return value;
  }

  canUpdateField(key: string) {
    const fieldKey = key.toUpperCase();

    if (this.allowedFields.indexOf(fieldKey) !== -1) {
      return true;
    } else {
      return false;
    }
  }
}
