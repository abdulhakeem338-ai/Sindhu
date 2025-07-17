import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, FONT_SIZES, SPACING, BORDER_RADIUS, CONFIG } from '../constants/constants';
import { Responsive, ResponsiveConstants } from '../helper/responsive';

interface AuthInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  icon?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  icon,
  onBlur,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedValue = new Animated.Value(value ? 1 : 0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: CONFIG.ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: CONFIG.ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.();
  };

  const labelStyle = {
    position: 'absolute' as const,
    left: icon ? ResponsiveConstants.SPACING.XL + ResponsiveConstants.SPACING.SM : ResponsiveConstants.SPACING.BASE,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [ResponsiveConstants.SPACING.BASE + Responsive.moderateScale(4), Responsive.moderateScale(4)],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [ResponsiveConstants.FONT_SIZES.BASE, ResponsiveConstants.FONT_SIZES.XS],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.textSecondary, COLORS.primary],
    }),
    fontFamily: FONTS.MEDIUM,
    zIndex: 1,
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
      ]}>
        {icon && (
          <Icon
            name={icon}
            size={Responsive.moderateScale(18)}
            color={isFocused ? COLORS.primary : COLORS.textSecondary}
            style={styles.icon}
          />
        )}
        
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        
        <TextInput
          style={[
            styles.input,
            icon && styles.inputWithIcon,
            secureTextEntry && styles.inputWithPassword,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={isFocused ? placeholder : ''}
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={Responsive.moderateScale(18)}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={Responsive.moderateScale(14)} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: ResponsiveConstants.SPACING.BASE,
  },
  inputContainer: {
    position: 'relative',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: ResponsiveConstants.BORDER_RADIUS.BASE,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: ResponsiveConstants.SPACING.BASE,
    paddingVertical: ResponsiveConstants.SPACING.BASE,
    minHeight: Responsive.moderateScale(56),
    justifyContent: 'center',
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: Responsive.moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: Responsive.moderateScale(4),
    elevation: 3,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: Responsive.moderateScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: Responsive.moderateScale(8),
    elevation: 6,
  },
  inputContainerError: {
    borderColor: COLORS.error,
  },
  icon: {
    position: 'absolute',
    left: ResponsiveConstants.SPACING.BASE,
    top: '50%',
    marginTop: -Responsive.moderateScale(9),
    zIndex: 2,
  },
  input: {
    color: COLORS.textPrimary,
    fontSize: ResponsiveConstants.FONT_SIZES.BASE,
    fontFamily: FONTS.REGULAR,
    paddingTop: ResponsiveConstants.SPACING.SM,
    paddingBottom: ResponsiveConstants.SPACING.SM,
    minHeight: Responsive.moderateScale(24),
  },
  inputWithIcon: {
    paddingLeft: ResponsiveConstants.SPACING.XL + ResponsiveConstants.SPACING.SM,
  },
  inputWithPassword: {
    paddingRight: ResponsiveConstants.SPACING.XL + ResponsiveConstants.SPACING.SM,
  },
  passwordToggle: {
    position: 'absolute',
    right: ResponsiveConstants.SPACING.BASE,
    top: '50%',
    marginTop: -Responsive.moderateScale(9),
    zIndex: 2,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ResponsiveConstants.SPACING.XS,
    paddingHorizontal: ResponsiveConstants.SPACING.XS,
  },
  errorText: {
    color: COLORS.error,
    fontSize: ResponsiveConstants.FONT_SIZES.XS,
    fontFamily: FONTS.REGULAR,
    marginLeft: ResponsiveConstants.SPACING.XS,
  },
});

export default AuthInput; 