import { create } from 'zustand';
import { BookingWithProperty } from '../types';

interface BookingStore {
  bookings: BookingWithProperty[];
  setBookings: (bookings: BookingWithProperty[]) => void;
  addBooking: (booking: BookingWithProperty) => void;
  updateBooking: (id: string, booking: Partial<BookingWithProperty>) => void;
  removeBooking: (id: string) => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  setBookings: (bookings) => set({ bookings }),
  addBooking: (booking) => set((state) => ({ 
    bookings: [...state.bookings, booking] 
  })),
  updateBooking: (id, booking) => set((state) => ({
    bookings: state.bookings.map((b) => 
      b.id === id ? { ...b, ...booking } : b
    )
  })),
  removeBooking: (id) => set((state) => ({
    bookings: state.bookings.filter((b) => b.id !== id)
  })),
})); 