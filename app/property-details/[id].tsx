import { PoppinsText } from '@/components/PoppinsText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { bookingService, propertyService } from '@/services/api';
import { useBookingStore } from '@/store/useBookingStore';
import { BookingWithProperty } from '@/types';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageStyle,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Styles = {
  container: ViewStyle;
  scrollView: ViewStyle;
  scrollContent: ViewStyle;
  centered: ViewStyle;
  headerBar: ViewStyle;
  headerTitle: TextStyle;
  headerBackBtn: ViewStyle;
  image: ImageStyle;
  bannerImage: ImageStyle;
  thumbnailRow: ViewStyle;
  thumbnailPressable: ViewStyle;
  thumbnailImage: ImageStyle;
  infoSection: ViewStyle;
  title: TextStyle;
  price: TextStyle;
  address: TextStyle;
  section: ViewStyle;
  mapSection: ViewStyle;
  mapContainer: ViewStyle;
  map: ViewStyle;
  mapImage: ImageStyle;
  coords: TextStyle;
  sectionTitle: TextStyle;
  featuresTitle: TextStyle;
  featuresRow: ViewStyle;
  features: ViewStyle;
  feature: ViewStyle;
  featureBadge: ViewStyle;
  featureIcon: ViewStyle;
  featureText: TextStyle;
  bookingSection: ViewStyle;
  bookingTitle: TextStyle;
  datePickerContainer: ViewStyle;
  datePickerButton: ViewStyle;
  datePickerLabel: TextStyle;
  datePickerValue: TextStyle;
  bookingBadge: ViewStyle;
  bookingText: TextStyle;
  bottomBar: ViewStyle;
  bookButton: ViewStyle;
  bookButtonText: TextStyle;
  errorText: TextStyle;
  iosDatePicker: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerBackBtn: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  image: {
    width: '100%',
    height: 300,
  },
  bannerImage: {
    width: '100%',
    height: 300,
  },
  thumbnailRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    marginTop: -50,
    justifyContent: 'center',
  },
  thumbnailPressable: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  infoSection: {
    // padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 24,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  mapSection: {
    marginTop: 24,
    paddingBottom: 8,
    borderRadius: 12,
    marginBottom: 12
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  coords: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 16,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  features: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureIcon: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
  },
  bookingSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookingTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  datePickerButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  datePickerLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  datePickerValue: {
    fontSize: 14,
  },
  bookingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 16,
    gap: 4,
  },
  bookingText: {
    fontSize: 14,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  bookButton: {
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    color: 'white',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  iosDatePicker: {
    // Add any specific styles for iOS date picker if needed
  },
});

const getFeatureIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase();
  if (lowerFeature.includes('bedroom')) return 'bed';
  if (lowerFeature.includes('bathroom')) return 'bath';
  if (lowerFeature.includes('pool')) return 'swimming-pool';
  if (lowerFeature.includes('parking')) return 'car';
  if (lowerFeature.includes('gym')) return 'dumbbell';
  if (lowerFeature.includes('fireplace')) return 'fire';
  if (lowerFeature.includes('view')) return 'mountain';
  if (lowerFeature.includes('kitchen')) return 'utensils';
  if (lowerFeature.includes('cellar')) return 'wine-bottle';
  if (lowerFeature.includes('golf')) return 'golf-ball';
  if (lowerFeature.includes('hot tub')) return 'hot-tub';
  if (lowerFeature.includes('ceiling')) return 'building';
  return 'home';
};

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const bookings = useBookingStore((state) => state.bookings);
  const setBookings = useBookingStore((state) => state.setBookings);
  const addBooking = useBookingStore((state) => state.addBooking);
  const queryClient = useQueryClient();

  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000)); // Next day

  // Fetch property details
  const { data: property, isLoading: isLoadingProperty, error: propertyError } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyService.getProperty(id),
  });

  // Fetch bookings if not already in store
  const { data: userBookings } = useQuery<BookingWithProperty[]>({
    queryKey: ['bookings', 'user1'],
    queryFn: () => bookingService.getUserBookings('user1'),
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: (dates: { checkIn: Date; checkOut: Date }) => 
      bookingService.createBooking({
        propertyId: id,
        userId: 'user1', // Hardcoded for now
        checkIn: format(dates.checkIn, 'yyyy-MM-dd'),
        checkOut: format(dates.checkOut, 'yyyy-MM-dd'),
        status: 'confirmed',
      }),
    onSuccess: (newBooking) => {
      addBooking(newBooking);
      queryClient.invalidateQueries({ queryKey: ['bookings', 'user1'] });
      Alert.alert(
        'Booking Confirmed',
        'Your booking has been successfully created!',
        [{ text: 'OK', onPress: () => router.push('/bookings') }]
      );
    },
    onError: (error) => {
      Alert.alert(
        'Booking Failed',
        'There was an error creating your booking. Please try again.'
      );
    },
  });

  // Update store when bookings are fetched
  useEffect(() => {
    if (userBookings) {
      setBookings(userBookings);
    }
  }, [userBookings, setBookings]);

  const isBooked = bookings.some(
    booking => booking.propertyId === id && booking.status === 'confirmed'
  );

  const handleBookNow = () => {
    if (checkOut <= checkIn) {
      Alert.alert('Invalid Dates', 'Check-out date must be after check-in date.');
      return;
    }
    createBookingMutation.mutate({ checkIn, checkOut });
  };

  if (isLoadingProperty) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </ThemedView>
    );
  }

  if (propertyError || !property) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <PoppinsText style={[styles.errorText, { color: colors.secondaryText }]}>
          {propertyError ? 'Error loading property details.' : 'Property not found.'}
        </PoppinsText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Property Info',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.primaryText,
        }} 
      />
      <ThemedView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            !isBooked && { paddingBottom: 100 }
          ]}
        >
          {/* Image Gallery */}
          <View style={{ width: '100%' }}>
            <Image
              source={{ uri: property.images[0] }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View style={[styles.thumbnailRow]}>
              {property.images.slice(0, 3).map((img, idx) => (
                <Pressable key={idx} style={[styles.thumbnailPressable, { backgroundColor: colors.cardBg }]}>
                  <Image
                    source={{ uri: img }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            {/* Property Info */}
            <View style={styles.infoSection}>
              <PoppinsText weight='bold' style={[styles.title, { color: colors.primaryText }]}>
                {property.title}
              </PoppinsText>
              <PoppinsText style={[styles.price, { color: colors.tint }]}>
                ${property.price.toLocaleString()} / month
              </PoppinsText>
              <PoppinsText style={[styles.address, { color: colors.secondaryText }]}>
                {property.location.address}, {property.location.city}, {property.location.state}
              </PoppinsText>
            </View>

            {/* Map Preview */}
            <View style={[styles.mapSection, { backgroundColor: colors.cardBg }]}>
              <MapView
                style={styles.mapImage}
                initialRegion={{
                  latitude: property.location.coordinates.latitude,
                  longitude: property.location.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: property.location.coordinates.latitude,
                    longitude: property.location.coordinates.longitude,
                  }}
                />
              </MapView>
              <PoppinsText style={[styles.coords, { color: colors.secondaryText }]}>
                {property.location.coordinates.latitude.toFixed(4)}, {property.location.coordinates.longitude.toFixed(4)}
              </PoppinsText>
            </View>

            {/* Features */}
            <PoppinsText style={[styles.featuresTitle, { color: colors.primaryText }]}>
              FEATURES
            </PoppinsText>
            <View style={styles.featuresRow}>
              {property.features.map((feature, index) => (
                <View key={index} style={[styles.featureBadge, { backgroundColor: colors.cardBg }]}>
                  <FontAwesome5 
                    name={getFeatureIcon(feature)} 
                    size={16} 
                    color={colors.tint} 
                    style={styles.featureIcon}
                  />
                  <PoppinsText style={[styles.featureText, { color: colors.primaryText }]}>
                    {feature}
                  </PoppinsText>
                </View>
              ))}
            </View>

            {isBooked ? (
              <View style={[styles.bookingBadge, { backgroundColor: colors.cardBg }]}>
                <Ionicons name="checkmark-circle" size={16} color={colors.tint} />
                <PoppinsText style={[styles.bookingText, { color: colors.tint }]}>
                  Booked
                </PoppinsText>
              </View>
            ) : (
              <View style={[styles.bookingSection, { backgroundColor: colors.cardBg }]}>
                <PoppinsText style={[styles.bookingTitle, { color: colors.primaryText }]}>
                  Select Dates
                </PoppinsText>
                <View style={styles.datePickerContainer}>
                  <Pressable
                    style={[styles.datePickerButton, { 
                      borderColor: colors.secondaryText,
                      backgroundColor: colors.background 
                    }]}
                    onPress={() => setShowCheckInPicker(true)}
                  >
                    <PoppinsText style={[styles.datePickerLabel, { color: colors.secondaryText }]}>
                      Check-in
                    </PoppinsText>
                    <PoppinsText style={[styles.datePickerValue, { color: colors.primaryText }]}>
                      {format(checkIn, 'MMM dd, yyyy')}
                    </PoppinsText>
                  </Pressable>
                  <Pressable
                    style={[styles.datePickerButton, { 
                      borderColor: colors.secondaryText,
                      backgroundColor: colors.background 
                    }]}
                    onPress={() => setShowCheckOutPicker(true)}
                  >
                    <PoppinsText style={[styles.datePickerLabel, { color: colors.secondaryText }]}>
                      Check-out
                    </PoppinsText>
                    <PoppinsText style={[styles.datePickerValue, { color: colors.primaryText }]}>
                      {format(checkOut, 'MMM dd, yyyy')}
                    </PoppinsText>
                  </Pressable>
                </View>
              </View>
            )}

            {(showCheckInPicker || showCheckOutPicker) && (
              <DateTimePicker
                value={showCheckInPicker ? checkIn : checkOut}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  if (Platform.OS === 'android') {
                    setShowCheckInPicker(false);
                    setShowCheckOutPicker(false);
                  }
                  if (selectedDate) {
                    if (showCheckInPicker) {
                      setCheckIn(selectedDate);
                      if (selectedDate >= checkOut) {
                        setCheckOut(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
                      }
                    } else {
                      if (selectedDate > checkIn) {
                        setCheckOut(selectedDate);
                      }
                    }
                  }
                }}
                style={Platform.OS === 'ios' ? styles.iosDatePicker : undefined}
              />
            )}
          </View>
        </ScrollView>

        {!isBooked && (
          <View style={[styles.bottomBar, { backgroundColor: colors.background }]}>
            <Pressable
              style={[styles.bookButton, { backgroundColor: colors.tint }]}
              onPress={handleBookNow}
              disabled={createBookingMutation.isPending}
            >
              {createBookingMutation.isPending ? (
                <ActivityIndicator color="white" />
              ) : (
                <PoppinsText style={styles.bookButtonText}>
                  Book Now
                </PoppinsText>
              )}
            </Pressable>
          </View>
        )}
      </ThemedView>
    </>
  );
} 