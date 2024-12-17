import IAmenities from './IAmenities';
import ICategories from './iCategories';
import IImage from './IImage';
import ILocations from './ILocations';
import IReviews from './IReviews';

export default interface IApartment {
  id: number;
  slug: string;
  owner: number;
  title: string;
  description: string;
  price: string;
  room_count: number;
  property_type: string;
  address: string;
  city: string;
  amenities: IAmenities[];
  images: IImage[];
  locations: ILocations.Location[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  is_favorite: boolean | null;
  reviews: IReviews[];
  categories: ICategories[];
  max_guests: number;
  bed_count: number;
  bathroom_count: number;
}
