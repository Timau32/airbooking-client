declare namespace ILocations {
  interface IRegions {
    id: string;
    name: string;
    slug: string;
    country: IContries;
    created_at: string;
    updated_at: string;
  }

  interface ICities {
    id: string;
    name: string;
    slug: string;
    image: string;
    region: IRegions;
    latitude: any;
    longitude: any;
    updated_at: string;
    created_at: string;
  }

  interface IContries {
    id: string;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
    image: string;
    code: string;
  }

  interface Location {
    id: number;
    latitude: number;
    longitude: number;
    address: string | null;
    city: ICities
  }
}

export default ILocations;
