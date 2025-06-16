export interface Property {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
}