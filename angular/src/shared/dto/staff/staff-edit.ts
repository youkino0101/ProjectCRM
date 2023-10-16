

export interface IEditStaffDto {
    id: number;
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    address: string;
    staffStatus: string;
}

export class EditStaffDto implements IEditStaffDto {
  id: number;
  staffCode: string;
  staffName: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  address: string;
  staffStatus: string;

  constructor(data?: IEditStaffDto) {
      if (data) {
          for (var property in data) {
              if (data.hasOwnProperty(property))
                  (<any>this)[property] = (<any>data)[property];
          }
      }
  }

  init(_data?: any) {
      if (_data) {
          this.id = _data["id"];
          this.staffCode = _data["staffCode"];
          this.staffName = _data["staffName"];
          this.email = _data["email"];
          this.address = _data["address"];
          this.phoneNumber = _data["phoneNumber"];
          this.staffStatus = _data["staffStatus"];
      }
  }

  static fromJS(data: any): EditStaffDto {
      data = typeof data === 'object' ? data : {};
      let result = new EditStaffDto();
      result.init(data);
      return result;
  }

  toJSON(data?: any) {
      data = typeof data === 'object' ? data : {};
      data["id"] = this.id;
      data["staffCode"] = this.staffCode;
      data["staffName"] = this.staffName;
      data["email"] = this.email;
      data["address"] = this.address;
      data["phoneNumber"] = this.phoneNumber;
      data["staffStatus"] = this.staffStatus;
      return data;
  }

  clone(): EditStaffDto {
      const json = this.toJSON();
      let result = new EditStaffDto();
      result.init(json);
      return result;
  }
}

