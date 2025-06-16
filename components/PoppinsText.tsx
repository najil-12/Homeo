import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export type PoppinsTextProps = TextProps & {
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  color?: string;
  size?: number;
};

export function PoppinsText({
  style,
  weight = 'regular',
  color,
  size = 16,
  ...rest
}: PoppinsTextProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getFontFamily = () => {
    switch (weight) {
      case 'medium':
        return 'Poppins-Medium';
      case 'semiBold':
        return 'Poppins-SemiBold';
      case 'bold':
        return 'Poppins-Bold';
      default:
        return 'Poppins-Regular';
    }
  };

  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(),
          fontSize: size,
          color: color ?? colors.text,
        },
        style,
      ]}
      {...rest}
    />
  );
}

// Predefined styles for common text variants
export const poppinsStyles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },
  h2: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  h3: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  body: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  caption: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
}); 