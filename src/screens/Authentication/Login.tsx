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
import apiService from '../../api/apiService';
import { setToken, setUser } from '../../redux/app/appAction';
import { useAppDispatch } from '../../redux/hooks';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const Login: React.FC<ScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Prepare data for API call
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await apiService.login(loginData);
      
      if (response && response.success) {
        console.log(response);
        dispatch(setUser(response.user));
        dispatch(setToken(response.token));
        Alert.alert(
          'Welcome Back!',
          response.message || 'You have successfully logged in.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home'),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error?.response?.data?.message || 'Invalid email or password. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Social Login', `${provider} login functionality will be implemented here.`);
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented here.');
  };

  const updateFormData = (field: keyof LoginFormData, value: string) => {
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
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>
                Sign in to continue your journey with us
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
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
              placeholder="Enter your password"
              icon="lock-closed"
              error={errors.password}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <GradientButton
              title="Sign In"
              onPress={handleLogin}
              loading={loading}
              size="large"
              icon="log-in"
              style={styles.loginButton}
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
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: ResponsiveConstants.SPACING.SM,
    marginBottom: ResponsiveConstants.SPACING.LG,
  },
  forgotPasswordText: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.primary,
  },
  loginButton: {
    marginTop: ResponsiveConstants.SPACING.BASE,
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
  signupLink: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.primary,
  },
});

export default Login; 