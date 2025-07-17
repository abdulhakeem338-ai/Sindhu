import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, FONT_SIZES, SPACING, BORDER_RADIUS, SOCIAL_DETAIL } from '../constants/constants';
import { Responsive, ResponsiveConstants } from '../helper/responsive';

interface SocialLoginButtonProps {
  provider: 'google' | 'apple' | 'facebook';
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onPress,
  title,
  disabled = false,
}) => {
  const getProviderConfig = () => {
    switch (provider) {
      case 'google':
        return {
          ...SOCIAL_DETAIL.GOOGLE,
          defaultTitle: 'Continue with Google',
        };
      case 'apple':
        return {
          ...SOCIAL_DETAIL.APPLE,
          defaultTitle: 'Continue with Apple',
        };
      case 'facebook':
        return {
          ...SOCIAL_DETAIL.FACEBOOK,
          defaultTitle: 'Continue with Facebook',
        };
      default:
        return {
          ...SOCIAL_DETAIL.GOOGLE,
          defaultTitle: 'Continue with Google',
        };
    }
  };

  const config = getProviderConfig();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: disabled ? COLORS.textMuted : config.backgroundColor,
          borderColor: disabled ? COLORS.textMuted : config.color,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Icon
        name={config.icon}
        size={Responsive.moderateScale(24)}
        color={disabled ? COLORS.textMuted : config.color}
        style={styles.icon}
      />
      <Text
        style={[
          styles.text,
          {
            color: disabled ? COLORS.textMuted : config.textColor,
          },
        ]}
      >
        {title || config.defaultTitle}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ResponsiveConstants.SPACING.LG,
    paddingVertical: ResponsiveConstants.SPACING.BASE,
    borderRadius: ResponsiveConstants.BORDER_RADIUS.BASE,
    borderWidth: 1,
    marginVertical: ResponsiveConstants.SPACING.XS,
    minHeight: Responsive.moderateScale(48),
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: Responsive.moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: Responsive.moderateScale(4),
    elevation: 3,
  },
  icon: {
    marginRight: ResponsiveConstants.SPACING.SM,
  },
  text: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.MEDIUM,
  },
});

export default SocialLoginButton; 