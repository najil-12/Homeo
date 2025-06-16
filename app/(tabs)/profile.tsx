import { PoppinsText } from '@/components/PoppinsText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { profileService } from '../../services/api';
import { useUserStore } from '../../store/useUserStore';

const Header = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <ThemedView style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerContent}>
        <PoppinsText weight="bold" style={[styles.headerTitle, { color: colors.primaryText }]}>
          Profile
        </PoppinsText>
        <View style={styles.headerSubtitle}>
          <Ionicons name="person-outline" size={16} color={colors.secondaryText} />
          <PoppinsText style={[styles.headerSubtitleText, { color: colors.secondaryText }]}>
            Manage your account
          </PoppinsText>
        </View>
      </View>
    </ThemedView>
  );
};

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { data: profile, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', 'user1'],
    queryFn: () => profileService.getProfile('user1'),
  });

  const setProfile = useUserStore((state) => state.setProfile);

  // Update global store when data is fetched
  React.useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

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

  if (!profile) {
    return (
      <ThemedView style={styles.safeArea}>
        <Header />
        <View style={styles.emptyContainer}>
          <PoppinsText style={[styles.emptyText, { color: colors.secondaryText }]}>
            Profile not found. Please try again later.
          </PoppinsText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.cardBg }]}>
            <PoppinsText style={[styles.avatarText, { color: colors.tint }]}>
              {profile.name.charAt(0).toUpperCase()}
            </PoppinsText>
          </View>
          <PoppinsText weight="bold" style={[styles.userName, { color: colors.primaryText }]}>
            {profile.name}
          </PoppinsText>
          <PoppinsText style={[styles.userEmail, { color: colors.secondaryText }]}>
            {profile.email}
          </PoppinsText>
        </View>

        {/* Stats Section */}
        <ThemedView style={[styles.statsCard, { backgroundColor: colors.cardBg }]}>
          <PoppinsText weight="semiBold" style={[styles.statsTitle, { color: colors.primaryText }]}>
            Booking Statistics
          </PoppinsText>
          <View style={styles.statsContent}>
            <View style={styles.statItem}>
              <PoppinsText style={[styles.statLabel, { color: colors.secondaryText }]}>
                Total Bookings
              </PoppinsText>
              <PoppinsText weight="bold" style={[styles.statValue, { color: colors.tint }]}>
                {profile.bookings.length}
              </PoppinsText>
            </View>
          </View>
        </ThemedView>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: '#EF4444' }]}
          onPress={() => {
            // In a real app, this would handle logout
            console.log('Logout pressed');
          }}
        >
          <PoppinsText weight="semiBold" style={styles.logoutButtonText}>
            Logout
          </PoppinsText>
        </TouchableOpacity>
      </View>
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    textAlign: 'center',
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
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '600',
  },
  userName: {
    fontSize: 24,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
  },
  statsCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  statsContent: {
    flexDirection: 'row',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
  },
  logoutButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorCard: {
    // width: '90%',
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
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  retryIcon: {
    marginRight: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
}); 