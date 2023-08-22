import * as moment from 'moment';

export class CreateStaffDto {
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: moment.Moment;
    address: string;
    file: File | null;

    constructor(staffCode: string,staffName: string, phoneNumber: string, email: string, birthDate: moment.Moment, address: string, file: File | null) {
        this.staffCode = staffCode;
        this.staffName = staffName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.birthDate = birthDate;
        this.address = address;
        this.file = file;
      }
}