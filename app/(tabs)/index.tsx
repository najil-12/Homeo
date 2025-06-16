import { PoppinsText } from '@/components/PoppinsText';
import { PropertyCard } from '@/components/PropertyCard';
import { SearchBar } from '@/components/SearchBar';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { propertyService } from '@/services/api';
import { useBookingStore } from '@/store/useBookingStore';
import { Property } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Platform, Pressable, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const { bookings } = useBookingStore();

  const { data: properties, isLoading, error, refetch } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: propertyService.getProperties,
  });

  const filteredProperties = properties?.filter((property: Property) => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.tint} />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <View style={[styles.errorCard, { backgroundColor: colors.cardBg }]}>
          <View style={styles.errorIconContainer}>
            <Ionicons name="alert-circle" size={48} color="#EF4444" />
          </View>
          <PoppinsText weight="semiBold" style={[styles.errorTitle, { color: colors.primaryText }]}>
            Oops! Something went wrong
          </PoppinsText>
          <PoppinsText style={[styles.errorText, { color: colors.secondaryText }]}>
            We couldn't load the properties. Please check your connection and try again.
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
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { borderBottomColor: '#E5E7EB' }]}>
        <PoppinsText style={[styles.headerTitle, { color: colors.primaryText }]}>
          Find Your <PoppinsText weight='bold' style={[styles.headerTitle, { color: colors.price }]}>Dream Home</PoppinsText>
        </PoppinsText>
        <PoppinsText style={[styles.headerSubtitle, { color: colors.secondaryText }]}>
          Discover the perfect property for you
        </PoppinsText>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search properties..."
        />
      </View>
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <PropertyCard
            title={item.title}
            price={item.price}
            location={item.location}
            features={item.features}
            imageUrl={item.images[0]}
            onPress={() => router.push(`/property-details/${item.id}`)}
            style={styles.card}
            isBooked={bookings.some((booking) => booking.propertyId === item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search" size={48} color={colors.secondaryText} style={styles.emptyIcon} />
            <PoppinsText style={[styles.emptyText, { color: colors.secondaryText }]}>
              No properties found matching your search
            </PoppinsText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  headerSubtitle: {
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 0,
  },
  card: {
    marginBottom: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
  },
  emptyIcon: {
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 32,
  },
});

