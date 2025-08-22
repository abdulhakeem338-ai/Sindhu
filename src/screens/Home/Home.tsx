import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS, FONT_SIZES, SPACING, BORDER_RADIUS, GRADIENT } from '../../constants/constants';
import { Responsive, ResponsiveConstants } from '../../helper/responsive';
import { ScreenProps } from '../../navigations/types';
import { setLogout } from '../../redux/app/appAction';
import { useAppDispatch } from '../../redux/hooks';

const Home: React.FC<ScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.navigate('Welcome'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={GRADIENT.COLORS.PRIMARY}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Welcome to Sindhu</Text>
          <Text style={styles.subtitle}>You're successfully logged in!</Text>
        </View>
        
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="log-out-outline" size={Responsive.moderateScale(24)} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Icon name="checkmark-circle" size={Responsive.moderateScale(48)} color={COLORS.success} />
          <Text style={styles.welcomeTitle}>Authentication Successful!</Text>
          <Text style={styles.welcomeText}>
            You have successfully completed the authentication flow. This is your home screen where you can start building your app's main features.
          </Text>
        </View>

       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ResponsiveConstants.SPACING.LG,
    paddingVertical: ResponsiveConstants.SPACING.BASE,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: ResponsiveConstants.FONT_SIZES.XL,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    marginTop: ResponsiveConstants.SPACING.XS,
  },
  logoutButton: {
    width: Responsive.moderateScale(40),
    height: Responsive.moderateScale(40),
    borderRadius: ResponsiveConstants.BORDER_RADIUS.FULL,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: Responsive.moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: Responsive.moderateScale(4),
    elevation: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: ResponsiveConstants.SPACING.LG,
    paddingTop: ResponsiveConstants.SPACING.LG,
  },
  welcomeCard: {
    backgroundColor: COLORS.backgroundLight,
    borderRadius: ResponsiveConstants.BORDER_RADIUS.LG,
    padding: ResponsiveConstants.SPACING.XL,
    alignItems: 'center',
    marginBottom: ResponsiveConstants.SPACING.XL,
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: Responsive.moderateScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: Responsive.moderateScale(8),
    elevation: 6,
  },
  welcomeTitle: {
    fontSize: ResponsiveConstants.FONT_SIZES.LG,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
    marginTop: ResponsiveConstants.SPACING.BASE,
    marginBottom: ResponsiveConstants.SPACING.SM,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: Responsive.moderateScale(20),
  },
  featuresContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: ResponsiveConstants.FONT_SIZES.BASE,
    fontFamily: FONTS.SEMIBOLD,
    color: COLORS.textPrimary,
    marginBottom: ResponsiveConstants.SPACING.BASE,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: ResponsiveConstants.BORDER_RADIUS.BASE,
    padding: ResponsiveConstants.SPACING.BASE,
    marginBottom: ResponsiveConstants.SPACING.SM,
    shadowColor: COLORS.background,
    shadowOffset: { width: 0, height: Responsive.moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: Responsive.moderateScale(4),
    elevation: 3,
  },
  featureText: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textPrimary,
    marginLeft: ResponsiveConstants.SPACING.BASE,
    flex: 1,
  },
});

export default Home; 