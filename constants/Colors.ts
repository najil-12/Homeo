/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// Common colors used across the app
const commonColors = {
  // Background colors
  searchBarBg: '#f0f0f0',
  featureBadgeBg: '#f0f0f0',
  cardBg: '#f1f1f1',
  
  // Text colors
  primaryText: '#333333',
  secondaryText: '#666666',
  placeholderText: '#999999',
  
  // Accent colors
  price: '#0a7ea4',
  
  // Shadow
  shadow: '#000000',
};

export const Colors = {
  light: {
    // Theme colors
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    
    // Common colors
    ...commonColors,
  },
  dark: {
    // Theme colors
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    
    // Common colors with dark mode adjustments
    searchBarBg: '#2A2A2A',
    featureBadgeBg: '#2A2A2A',
    cardBg: '#1E1E1E',
    primaryText: '#ECEDEE',
    secondaryText: '#9BA1A6',
    placeholderText: '#687076',
    price: '#4FB3D9',
    shadow: '#000000',
  },
};
