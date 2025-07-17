import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import GradientButton from '../../components/GradientButton';
import { COLORS, FONTS, FONT_SIZES, SPACING, BORDER_RADIUS, GRADIENT, CONFIG } from '../../constants/constants';
import { Responsive, ResponsiveConstants } from '../../helper/responsive';
import { ScreenProps } from '../../navigations/types';

const { width, height } = Dimensions.get('window');

const Welcome: React.FC<ScreenProps> = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animations = [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: CONFIG.ANIMATION_DURATION * 2,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: CONFIG.ANIMATION_DURATION * 1.6,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ];

    Animated.parallel(animations).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  const handleGetStarted = () => {
    navigation.navigate('Signup');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={GRADIENT.COLORS.PRIMARY}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>

      <View style={styles.content}>
        {/* Logo/Icon Section */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.logoBackground}>
            <Icon name="rocket" size={Responsive.moderateScale(60)} color={COLORS.textPrimary} />
          </View>
        </Animated.View>

        {/* Title Section */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Welcome to Sindhu</Text>
          <Text style={styles.subtitle}>
            Your gateway to amazing experiences and endless possibilities
          </Text>
        </Animated.View>

        {/* Features Section */}
        <Animated.View
          style={[
            styles.featuresContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.featureItem}>
            <Icon name="shield-checkmark" size={Responsive.moderateScale(24)} color={COLORS.textPrimary} />
            <Text style={styles.featureText}>Secure & Private</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="flash" size={Responsive.moderateScale(24)} color={COLORS.textPrimary} />
            <Text style={styles.featureText}>Lightning Fast</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="heart" size={Responsive.moderateScale(24)} color={COLORS.textPrimary} />
            <Text style={styles.featureText}>User Friendly</Text>
          </View>
        </Animated.View>

        {/* Buttons Section */}
        <Animated.View
          style={[
            styles.buttonsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <GradientButton
            title="Get Started"
            onPress={handleGetStarted}
            size="large"
            icon="arrow-forward"
            iconPosition="right"
            style={styles.getStartedButton}
          />
          
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
          >
            <Text style={styles.signInText}>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    borderRadius: ResponsiveConstants.BORDER_RADIUS.FULL,
    backgroundColor: COLORS.whiteTransparent10,
  },
  circle1: {
    width: Responsive.moderateScale(200),
    height: Responsive.moderateScale(200),
    top: height * 0.1,
    right: -Responsive.moderateScale(50),
  },
  circle2: {
    width: Responsive.moderateScale(150),
    height: Responsive.moderateScale(150),
    top: height * 0.3,
    left: -Responsive.moderateScale(30),
  },
  circle3: {
    width: Responsive.moderateScale(100),
    height: Responsive.moderateScale(100),
    bottom: height * 0.2,
    right: width * 0.2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ResponsiveConstants.SPACING.XL,
  },
  logoContainer: {
    marginBottom: ResponsiveConstants.SPACING.XXL,
  },
  logoBackground: {
    width: Responsive.moderateScale(120),
    height: Responsive.moderateScale(120),
    borderRadius: ResponsiveConstants.BORDER_RADIUS.FULL,
    backgroundColor: COLORS.whiteTransparent20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: Responsive.moderateScale(8) },
    shadowOpacity: 0.3,
    shadowRadius: Responsive.moderateScale(16),
    elevation: 8,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: ResponsiveConstants.SPACING.XXL,
  },
  title: {
    fontSize: ResponsiveConstants.FONT_SIZES.XXXL,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: ResponsiveConstants.SPACING.LG,
  },
  subtitle: {
    fontSize: ResponsiveConstants.FONT_SIZES.LG,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: Responsive.moderateScale(28),
    maxWidth: width * 0.8,
  },
  featuresContainer: {
    marginBottom: ResponsiveConstants.SPACING.XXXL,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ResponsiveConstants.SPACING.SM,
  },
  featureText: {
    fontSize: ResponsiveConstants.FONT_SIZES.BASE,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.textPrimary,
    marginLeft: ResponsiveConstants.SPACING.BASE,
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    marginBottom: ResponsiveConstants.SPACING.LG,
  },
  signInButton: {
    paddingVertical: ResponsiveConstants.SPACING.BASE,
  },
  signInText: {
    fontSize: ResponsiveConstants.FONT_SIZES.BASE,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.textPrimary,
    textDecorationLine: 'underline',
  },
});

export default Welcome; 