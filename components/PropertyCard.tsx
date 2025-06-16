import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { PoppinsText } from './PoppinsText';
import { ThemedView } from './ThemedView';

interface PropertyCardProps {
  title: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
  };
  features: string[];
  imageUrl: string;
  onPress?: () => void;
  style?: ViewStyle;
  isBooked?: boolean;
}

export function PropertyCard({ 
  title, 
  price, 
  location, 
  features, 
  imageUrl, 
  onPress,
  style,
  isBooked 
}: PropertyCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const content = (
    <ThemedView style={[styles.card, style, { backgroundColor: colors.background, shadowColor: colors.shadow }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.infoContainer}>
          <PoppinsText weight="semiBold" style={styles.title} numberOfLines={2}>
            {title}
          </PoppinsText>
          <PoppinsText weight="semiBold" style={[styles.price, { color: colors.price }]}>
            ${price.toLocaleString()}/mo
          </PoppinsText>
          <PoppinsText style={[styles.address, { color: colors.secondaryText }]} numberOfLines={1}>
            {location.address}, {location.city}, {location.state}
          </PoppinsText>
          {isBooked && (
        <View style={[styles.bookingBadge, { backgroundColor: '#D1FAE5' }]}>
          <Ionicons name="checkmark-circle" size={16} color="#065F46" />
          <PoppinsText style={[styles.bookingText, { color: '#065F46' }]}>Booked</PoppinsText>
        </View>
      )}
        </View>
      </View>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <ThemedView
            key={index}
            style={[styles.featureBadge, { backgroundColor: colors.featureBadgeBg }]}
          >
            <PoppinsText style={[styles.featureText, { color: colors.secondaryText }]}>
              {feature}
            </PoppinsText>
          </ThemedView>
        ))}
      </View>
    </ThemedView>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const IMAGE_SIZE = 90;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 12,
  },
  card: {
    borderRadius: 18,
    padding: 12,
    gap: 14,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    minHeight: IMAGE_SIZE,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featureBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
  },
  bookingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 22,
    gap: 4,
    zIndex: 1,
    maxWidth: 80,
  },
  bookingText: {
    fontSize: 12,
    fontWeight: '600',
  },
}); 