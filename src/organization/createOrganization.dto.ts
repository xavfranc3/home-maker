import CreateAddressDto from '../address/createAddress.dto';

export class CreateOrganizationDto {
  name: string;
  address?: CreateAddressDto;
}

export default CreateOrganizationDto;
