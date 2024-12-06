import IAmenities from './IAmenities';
import IImage from './IImage';
import ILocations from './ILocations';

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
}


