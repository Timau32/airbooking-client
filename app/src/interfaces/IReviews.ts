export default interface IReviews {
  id: number;
  comment: string;
  rating: number;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  created_at: string;
  full_name?: string;
}
