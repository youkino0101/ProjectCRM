

export interface ICreateStaffDto {
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: Date;
    address: string;
}

export class CreateStaffDto implements ICreateStaffDto {
  staffCode: string;
  staffName: string;
  phoneNumber: string;
  email: string;
  birthDate: Date;
  address: string;

  constructor(data?: ICreateStaffDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.staffCode = _data["staffCode"];
          this.staffName = _data["staffName"];
          this.email = _data["email"];
          this.address = _data["address"];
          this.phoneNumber = _data["phoneNumber"];
      }
  }

  static fromJS(data: any): CreateStaffDto {
      data = typeof data === 'object' ? data : {};
      let result = new CreateStaffDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["staffCode"] = this.staffCode;
      data["staffName"] = this.staffName;
      data["email"] = this.email;
      data["address"] = this.address;
      data["phoneNumber"] = this.phoneNumber;
      return data;
  }

  clone(): CreateStaffDto {
      const json = this.toJSON();
      let result = new CreateStaffDto();
      result.init(json);
      return result;
  }
}

