import * as moment from 'moment';

export interface ICreateStaffDto {
    staffCode: string;
    staffName: string;
    phoneNumber: string;
    email: string;
    birthDate: moment.Moment;
    address: string;
}