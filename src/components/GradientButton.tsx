import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, FONT_SIZES, SPACING, BORDER_RADIUS, GRADIENT } from '../constants/constants';
import { Responsive, ResponsiveConstants } from '../helper/responsive';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: string;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const getGradientColors = () => {
    if (disabled) {
      return GRADIENT.COLORS.DISABLED;
    }
    
    switch (variant) {
      case 'primary':
        return GRADIENT.COLORS.PRIMARY;
      case 'secondary':
        return GRADIENT.COLORS.SECONDARY;
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return GRADIENT.COLORS.PRIMARY;
    }
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: ResponsiveConstants.BORDER_RADIUS.BASE,
      shadowColor: COLORS.background,
      shadowOffset: { width: 0, height: Responsive.moderateScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: Responsive.moderateScale(4),
      elevation: 3,
    };

    switch (size) {
      case 'small':
        return {
          ...baseStyle,
          paddingHorizontal: ResponsiveConstants.SPACING.BASE,
          paddingVertical: ResponsiveConstants.SPACING.XS,
          minHeight: Responsive.moderateScale(36),
        };
      case 'large':
        return {
          ...baseStyle,
          paddingHorizontal: ResponsiveConstants.SPACING.LG,
          paddingVertical: ResponsiveConstants.SPACING.BASE,
          minHeight: Responsive.moderateScale(52),
        };
      default:
        return {
          ...baseStyle,
          paddingHorizontal: ResponsiveConstants.SPACING.BASE,
          paddingVertical: ResponsiveConstants.SPACING.SM,
          minHeight: Responsive.moderateScale(44),
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: FONTS.MEDIUM,
      textAlign: 'center',
    };

    switch (size) {
      case 'small':
        return {
          ...baseStyle,
          fontSize: ResponsiveConstants.FONT_SIZES.XS,
        };
      case 'large':
        return {
          ...baseStyle,
          fontSize: ResponsiveConstants.FONT_SIZES.BASE,
        };
      default:
        return {
          ...baseStyle,
          fontSize: ResponsiveConstants.FONT_SIZES.SM,
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textMuted;
    if (variant === 'outline') return COLORS.primary;
    return COLORS.textPrimary;
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return Responsive.moderateScale(16);
      case 'large':
        return Responsive.moderateScale(24);
      default:
        return Responsive.moderateScale(20);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? COLORS.primary : COLORS.textPrimary}
        />
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && (
          <Icon
            name={icon}
            size={getIconSize()}
            color={getTextColor()}
            style={styles.iconLeft}
          />
        )}
        <Text style={[getTextStyle(), { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
        {icon && iconPosition === 'right' && (
          <Icon
            name={icon}
            size={getIconSize()}
            color={getTextColor()}
            style={styles.iconRight}
          />
        )}
      </>
    );
  };

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        style={[
          getButtonStyle(),
          {
            borderWidth: Responsive.moderateScale(2),
            borderColor: disabled ? COLORS.textMuted : COLORS.primary,
            backgroundColor: 'transparent',
          },
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={GRADIENT.POSITION.HORIZONTAL.start}
        end={GRADIENT.POSITION.HORIZONTAL.end}
        style={[
          StyleSheet.absoluteFillObject,
          { borderRadius: ResponsiveConstants.BORDER_RADIUS.XL },
        ]}
      />
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconLeft: {
    marginRight: ResponsiveConstants.SPACING.SM,
  },
  iconRight: {
    marginLeft: ResponsiveConstants.SPACING.SM,
  },
});

export default GradientButton; 