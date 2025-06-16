import { apiRequest, ENDPOINTS } from '../config/api';
import { Booking, BookingWithProperty, Property, UserProfile } from '../types';

// Booking Services
export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    return apiRequest<Booking[]>(ENDPOINTS.BOOKINGS.LIST);
  },

  getBookingWithProperty: async (booking: Booking): Promise<BookingWithProperty> => {
    const property = await apiRequest<Property>(
      ENDPOINTS.PROPERTIES.DETAIL(booking.propertyId)
    );
    return { ...booking, property };
  },

  getUserBookings: async (userId: string): Promise<BookingWithProperty[]> => {
    const bookings = await apiRequest<Booking[]>(
      ENDPOINTS.BOOKINGS.USER_BOOKINGS(userId)
    );
    
    return Promise.all(
      bookings.map((booking) => bookingService.getBookingWithProperty(booking))
    );
  },

  createBooking: async (booking: Omit<Booking, 'id'>): Promise<BookingWithProperty> => {
    const newBooking = await apiRequest<Booking>(ENDPOINTS.BOOKINGS.LIST, {
      method: 'POST',
      body: JSON.stringify({
        ...booking,
        status: 'confirmed', // Set initial status as confirmed
      }),
    });
    
    return bookingService.getBookingWithProperty(newBooking);
  },
};

// Profile Services
export const profileService = {
  getProfile: async (userId: string): Promise<UserProfile> => {
    return apiRequest<UserProfile>(ENDPOINTS.PROFILE.DETAIL(userId));
  },
};

// Property Services
export const propertyService = {
  getProperty: async (id: string): Promise<Property> => {
    return apiRequest<Property>(ENDPOINTS.PROPERTIES.DETAIL(id));
  },

  getProperties: async (): Promise<Property[]> => {
    return apiRequest<Property[]>(ENDPOINTS.PROPERTIES.LIST);
  },
}; 