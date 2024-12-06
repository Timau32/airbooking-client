import IApartment from "./IApartment";

export default interface IFavorites {
  created_at: string;
  id: number;
  property: IApartment;
  user: string;
}
