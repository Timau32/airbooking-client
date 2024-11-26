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
  amenities: string[];
  images: string[];
  locations: Location[];
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

interface Location {
  id: number;
  latitude: number;
  longitude: number;
}
