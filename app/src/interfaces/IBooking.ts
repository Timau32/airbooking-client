export default interface IBooking {
  id: number;
  property: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: string;
  user: string;
  created_at: string;
  updated_at: string;
}
