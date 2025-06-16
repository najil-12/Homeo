export interface Location {
  city: string;
  state: string;
  country: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Property {
  id: string;
  title: string;
  price: number;
  location: Location;
  features: string[];
  images: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bookings: string[];
}

export interface BookingWithProperty extends Booking {
  property: Property;
} 