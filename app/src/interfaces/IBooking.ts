export enum bookingStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'CONFIRMED',
  CANCELED = 'CANCELLED',
}

export default interface IBooking {
  id: number;
  property: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: bookingStatusEnum;
  user: string;
  created_at: string;
  updated_at: string;
}
