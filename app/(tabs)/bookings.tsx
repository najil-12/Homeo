import { PoppinsText } from '@/components/PoppinsText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bookingService } from '../../services/api';
import { useBookingStore } from '../../store/useBookingStore';
import { BookingWithProperty } from '../../types';

const BookingCard = ({ booking }: { booking: BookingWithProperty }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Pressable onPress={() => router.navigate(`/property-details/${booking.property.id}`)}>
      <ThemedView style={[styles.card, { backgroundColor: colors.background, shadowColor: colors.shadow }]}>
        <Image
          source={{ uri: booking.property.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        <PoppinsText weight="semiBold" style={[styles.title, { color: colors.primaryText }]}>
          {booking.property.title}
        </PoppinsText>
        <View style={styles.dateContainer}>
          <PoppinsText style={[styles.dateText, { color: colors.secondaryText }]}>
            Check-in: {format(new Date(booking.checkIn), 'MMM dd, yyyy')}
          </PoppinsText>
          <PoppinsText style={[styles.dateText, { color: colors.secondaryText }]}>
            Check-out: {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
          </PoppinsText>
        </View>
        <View style={styles.statusContainer}>
          <PoppinsText
            style={[
              styles.statusText,
              booking.status === 'confirmed' && styles.statusConfirmed,
              booking.status === 'pending' && styles.statusPending,
              booking.status === 'cancelled' && styles.statusCancelled,
            ]}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </PoppinsText>
        </View>
      </ThemedView>
    </Pressable>
  );
};

const Header = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.header, { 
      paddingTop: insets.top 
    }]}>
      <View style={styles.headerContent}>
        <PoppinsText weight="bold" style={[styles.headerTitle, { color: colors.primaryText }]}>
          My Bookings
        </PoppinsText>
        <View style={styles.headerSubtitle}>
          <Ionicons name="calendar-outline" size={16} color={colors.secondaryText} />
          <PoppinsText style={[styles.headerSubtitleText, { color: colors.secondaryText }]}>
            Manage your stays
          </PoppinsText>
        </View>
      </View>
    </ThemedView>
  );
};

export default function BookingsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { data: bookings, isLoading, error, refetch } = useQuery({
    queryKey: ['bookings', 'user1'],
    queryFn: () => bookingService.getUserBookings('user1'),
  });

  const setBookings = useBookingStore((state) => state.setBookings);

  // Update global store when data is fetched
  React.useEffect(() => {
    if (bookings) {
      setBookings(bookings);
    }
  }, [bookings, setBookings]);

  if (isLoading) {
    return (
      <ThemedView style={[styles.safeArea]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={[styles.safeArea]}>
        <View style={[styles.container, styles.centered]}>
          <View style={[styles.errorCard, { backgroundColor: colors.cardBg }]}>
            <View style={styles.errorIconContainer}>
              <Ionicons name="alert-circle" size={48} color="#EF4444" />
            </View>
            <PoppinsText weight="semiBold" style={[styles.errorTitle, { color: colors.primaryText }]}>
              Oops! Something went wrong
            </PoppinsText>
            <PoppinsText style={[styles.errorText, { color: colors.secondaryText }]}>
              We couldn't load your bookings. Please check your connection and try again.
            </PoppinsText>
            <Pressable
              style={[styles.retryButton, { backgroundColor: colors.tint }]}
              onPress={() => refetch()}
            >
              <Ionicons name="refresh" size={20} color="white" style={styles.retryIcon} />
              <PoppinsText weight="semiBold" style={styles.retryText}>
                Try Again
              </PoppinsText>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    );
  }

  if (!bookings?.length) {
    return (
      <ThemedView style={[styles.safeArea]}>
        <Header />
        <View style={styles.emptyContainer}>
          <PoppinsText style={[styles.emptyText, { color: colors.secondaryText }]}>
            No bookings found. Start exploring properties to make your first booking!
          </PoppinsText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.safeArea]}>
      <Header />
      <ThemedView style={styles.container}>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookingCard booking={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContent: {
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 4,
  },
  headerSubtitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerSubtitleText: {
    fontSize: 14,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorCard: {
    width: '90%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
  },
  listContent: {
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 0,
  },
  card: {
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 192,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusText: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    fontSize: 14,
  },
  statusConfirmed: {
    backgroundColor: '#D1FAE5',
    color: '#065F46',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  statusCancelled: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
}); 