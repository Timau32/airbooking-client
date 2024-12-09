export default interface ICategories {
    id: number; 
    name: string; 
    slug: string; 
    description: string; 
    icon: string;
    children: ICategories[]; 
}