import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthInput from '../../components/AuthInput';
import GradientButton from '../../components/GradientButton';
import SocialLoginButton from '../../components/SocialLoginButton';
import { COLORS, FONTS, FONT_SIZES, SPACING, BORDER_RADIUS, GRADIENT } from '../../constants/constants';
import { Responsive, ResponsiveConstants } from '../../helper/responsive';
import { ScreenProps } from '../../navigations/types';
import { Config } from '../../config';
import apiService from '../../api/apiService';
import { setToken, setUser } from '../../redux/app/appAction';
import { useAppDispatch } from '../../redux/hooks';

interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup: React.FC<ScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<SignupErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: SignupErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Prepare data for API call
      const signupData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      const response = await apiService.signup(signupData);
      
      if (response && response.success) {
        console.log(response);
        dispatch(setUser(response.user));
        dispatch(setToken(response.token));
        Alert.alert(
          'Success!',
          response.message || 'Your account has been created successfully.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (!Config.isFeatureEnabled('socialLogin')) {
      Alert.alert('Feature Disabled', 'Social login is currently disabled.');
      return;
    }
    Alert.alert('Social Login', `${provider} login functionality will be implemented here.`);
  };

  const updateFormData = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={GRADIENT.COLORS.PRIMARY}
        style={StyleSheet.absoluteFillObject}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={Responsive.moderateScale(24)} color={COLORS.textPrimary} />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Join us and start your amazing journey today
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <AuthInput
              label="Full Name"
              value={formData.fullName}
              onChangeText={(text) => updateFormData('fullName', text)}
              placeholder="Enter your full name"
              icon="person"
              error={errors.fullName}
              autoCapitalize="words"
            />

            <AuthInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              placeholder="Enter your email address"
              icon="mail"
              error={errors.email}
              keyboardType="email-address"
            />

            <AuthInput
              label="Password"
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              placeholder="Create a strong password"
              icon="lock-closed"
              error={errors.password}
              secureTextEntry
            />

            <AuthInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData('confirmPassword', text)}
              placeholder="Confirm your password"
              icon="lock-closed"
              error={errors.confirmPassword}
              secureTextEntry
            />

            <GradientButton
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              size="large"
              icon="person-add"
              style={styles.signupButton}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <SocialLoginButton
              provider="google"
              onPress={() => handleSocialLogin('Google')}
            />
            <SocialLoginButton
              provider="apple"
              onPress={() => handleSocialLogin('Apple')}
            />
            <SocialLoginButton
              provider="facebook"
              onPress={() => handleSocialLogin('Facebook')}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ResponsiveConstants.SPACING.LG,
    paddingBottom: ResponsiveConstants.SPACING.XL,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ResponsiveConstants.SPACING.LG,
    marginBottom: ResponsiveConstants.SPACING.XL,
  },
  backButton: {
    width: Responsive.moderateScale(40),
    height: Responsive.moderateScale(40),
    borderRadius: ResponsiveConstants.BORDER_RADIUS.FULL,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ResponsiveConstants.SPACING.BASE,
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: Responsive.moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: Responsive.moderateScale(4),
    elevation: 3,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: ResponsiveConstants.FONT_SIZES.XXL,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
    marginBottom: ResponsiveConstants.SPACING.XS,
  },
  subtitle: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  formContainer: {
    marginBottom: ResponsiveConstants.SPACING.XL,
  },
  signupButton: {
    marginTop: ResponsiveConstants.SPACING.LG,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ResponsiveConstants.SPACING.XL,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.textSecondary,
    marginHorizontal: ResponsiveConstants.SPACING.LG,
  },
  socialContainer: {
    marginBottom: ResponsiveConstants.SPACING.XL,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: ResponsiveConstants.SPACING.LG,
  },
  footerText: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.primary,
  },
});

export default Signup;