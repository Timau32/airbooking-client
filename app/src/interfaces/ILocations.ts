declare namespace ILocations {
  interface IRegions {
    id: string;
    name: string;
    slug: string;
    country: string;
  }

  interface ICities {
    id: string;
    name: string;
    slug: string;
    image: string;
    region: string;
    latitude: any;
    longitude: any;
  }

  interface IContries {
    id: string;
    name: string;
    slug: string;
    code: string;
  }
}

export default ILocations;
