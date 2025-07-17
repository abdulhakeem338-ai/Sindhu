import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, BORDER_RADIUS, GRADIENT, CONFIG } from './constants';
import { Responsive, ResponsiveConstants } from '../helper/responsive';

/**
 * Style Guide Component
 * 
 * This component demonstrates how to use all the constants defined in constants.ts
 * It serves as a reference for developers to understand the design system.
 */
const StyleGuide: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Colors Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colors</Text>
        
        <View style={styles.colorGrid}>
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: COLORS.primary }]} />
            <Text style={styles.colorLabel}>Primary</Text>
            <Text style={styles.colorValue}>{COLORS.primary}</Text>
          </View>
          
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: COLORS.secondary }]} />
            <Text style={styles.colorLabel}>Secondary</Text>
            <Text style={styles.colorValue}>{COLORS.secondary}</Text>
          </View>
          
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: COLORS.success }]} />
            <Text style={styles.colorLabel}>Success</Text>
            <Text style={styles.colorValue}>{COLORS.success}</Text>
          </View>
          
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: COLORS.error }]} />
            <Text style={styles.colorLabel}>Error</Text>
            <Text style={styles.colorValue}>{COLORS.error}</Text>
          </View>
          
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: COLORS.warning }]} />
            <Text style={styles.colorLabel}>Warning</Text>
            <Text style={styles.colorValue}>{COLORS.warning}</Text>
          </View>
          
          <View style={styles.colorItem}>
            <View style={[styles.colorSwatch, { backgroundColor: COLORS.info }]} />
            <Text style={styles.colorLabel}>Info</Text>
            <Text style={styles.colorValue}>{COLORS.info}</Text>
          </View>
        </View>
      </View>

      {/* Typography Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>
        
        <View style={styles.typographyItem}>
          <Text style={[styles.typographyText, { fontSize: ResponsiveConstants.FONT_SIZES.XS, fontFamily: FONTS.THIN }]}>
            Thin - Extra Small ({ResponsiveConstants.FONT_SIZES.XS}px)
          </Text>
        </View>
        
        <View style={styles.typographyItem}>
          <Text style={[styles.typographyText, { fontSize: ResponsiveConstants.FONT_SIZES.SM, fontFamily: FONTS.LIGHT }]}>
            Light - Small ({ResponsiveConstants.FONT_SIZES.SM}px)
          </Text>
        </View>
        
        <View style={styles.typographyItem}>
          <Text style={[styles.typographyText, { fontSize: ResponsiveConstants.FONT_SIZES.BASE, fontFamily: FONTS.REGULAR }]}>
            Regular - Base ({ResponsiveConstants.FONT_SIZES.BASE}px)
          </Text>
        </View>
        
        <View style={styles.typographyItem}>
          <Text style={[styles.typographyText, { fontSize: ResponsiveConstants.FONT_SIZES.LG, fontFamily: FONTS.MEDIUM }]}>
            Medium - Large ({ResponsiveConstants.FONT_SIZES.LG}px)
          </Text>
        </View>
        
        <View style={styles.typographyItem}>
          <Text style={[styles.typographyText, { fontSize: ResponsiveConstants.FONT_SIZES.XL, fontFamily: FONTS.SEMIBOLD }]}>
            Semibold - Extra Large ({ResponsiveConstants.FONT_SIZES.XL}px)
          </Text>
        </View>
        
        <View style={styles.typographyItem}>
          <Text style={[styles.typographyText, { fontSize: ResponsiveConstants.FONT_SIZES.XXL, fontFamily: FONTS.BOLD }]}>
            Bold - 2X Large ({ResponsiveConstants.FONT_SIZES.XXL}px)
          </Text>
        </View>
        
        <View style={styles.typographyItem}>
          <Text style={[styles.typographyText, { fontSize: ResponsiveConstants.FONT_SIZES.XXXL, fontFamily: FONTS.EXTRA_BOLD }]}>
            Extra Bold - 3X Large ({ResponsiveConstants.FONT_SIZES.XXXL}px)
          </Text>
        </View>
        
        <View style={styles.typographyItem}>
          <Text style={[styles.typographyText, { fontSize: ResponsiveConstants.FONT_SIZES.DISPLAY, fontFamily: FONTS.HEAVY }]}>
            Heavy - Display ({ResponsiveConstants.FONT_SIZES.DISPLAY}px)
          </Text>
        </View>
      </View>

      {/* Spacing Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Spacing</Text>
        
        <View style={styles.spacingItem}>
          <View style={[styles.spacingBox, { width: ResponsiveConstants.SPACING.XS, height: ResponsiveConstants.SPACING.XS }]} />
          <Text style={styles.spacingLabel}>XS: {ResponsiveConstants.SPACING.XS}px</Text>
        </View>
        
        <View style={styles.spacingItem}>
          <View style={[styles.spacingBox, { width: ResponsiveConstants.SPACING.SM, height: ResponsiveConstants.SPACING.SM }]} />
          <Text style={styles.spacingLabel}>SM: {ResponsiveConstants.SPACING.SM}px</Text>
        </View>
        
        <View style={styles.spacingItem}>
          <View style={[styles.spacingBox, { width: ResponsiveConstants.SPACING.BASE, height: ResponsiveConstants.SPACING.BASE }]} />
          <Text style={styles.spacingLabel}>BASE: {ResponsiveConstants.SPACING.BASE}px</Text>
        </View>
        
        <View style={styles.spacingItem}>
          <View style={[styles.spacingBox, { width: ResponsiveConstants.SPACING.LG, height: ResponsiveConstants.SPACING.LG }]} />
          <Text style={styles.spacingLabel}>LG: {ResponsiveConstants.SPACING.LG}px</Text>
        </View>
        
        <View style={styles.spacingItem}>
          <View style={[styles.spacingBox, { width: ResponsiveConstants.SPACING.XL, height: ResponsiveConstants.SPACING.XL }]} />
          <Text style={styles.spacingLabel}>XL: {ResponsiveConstants.SPACING.XL}px</Text>
        </View>
        
        <View style={styles.spacingItem}>
          <View style={[styles.spacingBox, { width: ResponsiveConstants.SPACING.XXL, height: ResponsiveConstants.SPACING.XXL }]} />
          <Text style={styles.spacingLabel}>XXL: {ResponsiveConstants.SPACING.XXL}px</Text>
        </View>
      </View>

      {/* Border Radius Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Border Radius</Text>
        
        <View style={styles.borderRadiusItem}>
          <View style={[styles.borderRadiusBox, { borderRadius: ResponsiveConstants.BORDER_RADIUS.SM }]} />
          <Text style={styles.borderRadiusLabel}>SM: {ResponsiveConstants.BORDER_RADIUS.SM}px</Text>
        </View>
        
        <View style={styles.borderRadiusItem}>
          <View style={[styles.borderRadiusBox, { borderRadius: ResponsiveConstants.BORDER_RADIUS.BASE }]} />
          <Text style={styles.borderRadiusLabel}>BASE: {ResponsiveConstants.BORDER_RADIUS.BASE}px</Text>
        </View>
        
        <View style={styles.borderRadiusItem}>
          <View style={[styles.borderRadiusBox, { borderRadius: ResponsiveConstants.BORDER_RADIUS.LG }]} />
          <Text style={styles.borderRadiusLabel}>LG: {ResponsiveConstants.BORDER_RADIUS.LG}px</Text>
        </View>
        
        <View style={styles.borderRadiusItem}>
          <View style={[styles.borderRadiusBox, { borderRadius: ResponsiveConstants.BORDER_RADIUS.XL }]} />
          <Text style={styles.borderRadiusLabel}>XL: {ResponsiveConstants.BORDER_RADIUS.XL}px</Text>
        </View>
        
        <View style={styles.borderRadiusItem}>
          <View style={[styles.borderRadiusBox, { borderRadius: ResponsiveConstants.BORDER_RADIUS.XXL }]} />
          <Text style={styles.borderRadiusLabel}>XXL: {ResponsiveConstants.BORDER_RADIUS.XXL}px</Text>
        </View>
        
        <View style={styles.borderRadiusItem}>
          <View style={[styles.borderRadiusBox, { borderRadius: ResponsiveConstants.BORDER_RADIUS.FULL }]} />
          <Text style={styles.borderRadiusLabel}>FULL: {ResponsiveConstants.BORDER_RADIUS.FULL}px</Text>
        </View>
      </View>

      {/* Configuration Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Animation Duration:</Text>
          <Text style={styles.configValue}>{CONFIG.ANIMATION_DURATION}ms</Text>
        </View>
        
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Debounce Delay:</Text>
          <Text style={styles.configValue}>{CONFIG.DEBOUNCE_DELAY}ms</Text>
        </View>
        
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Network Timeout:</Text>
          <Text style={styles.configValue}>{CONFIG.NETWORK_TIMEOUT}ms</Text>
        </View>
      </View>

      {/* Responsive Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Responsive Information</Text>
        
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Scale Factor:</Text>
          <Text style={styles.configValue}>{Responsive.getScaleFactor().toFixed(2)}</Text>
        </View>
        
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Device Size:</Text>
          <Text style={styles.configValue}>
            {Responsive.isSmallDevice() ? 'Small' : 
             Responsive.isMediumDevice() ? 'Medium' : 
             Responsive.isLargeDevice() ? 'Large' : 'Extra Large'}
          </Text>
        </View>
        
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Orientation:</Text>
          <Text style={styles.configValue}>
            {Responsive.getOrientation().charAt(0).toUpperCase() + Responsive.getOrientation().slice(1)}
          </Text>
        </View>
        
        <View style={styles.configItem}>
          <Text style={styles.configLabel}>Platform:</Text>
          <Text style={styles.configValue}>
            {Responsive.isIOS() ? 'iOS' : Responsive.isAndroid() ? 'Android' : 'Unknown'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: ResponsiveConstants.SPACING.BASE,
  },
  section: {
    marginBottom: ResponsiveConstants.SPACING.XL,
  },
  sectionTitle: {
    fontSize: ResponsiveConstants.FONT_SIZES.XL,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
    marginBottom: ResponsiveConstants.SPACING.LG,
  },
  
  // Colors
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorItem: {
    width: '48%',
    marginBottom: ResponsiveConstants.SPACING.LG,
    alignItems: 'center',
  },
  colorSwatch: {
    width: Responsive.moderateScale(60),
    height: Responsive.moderateScale(60),
    borderRadius: ResponsiveConstants.BORDER_RADIUS.BASE,
    marginBottom: ResponsiveConstants.SPACING.SM,
  },
  colorLabel: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.textPrimary,
    marginBottom: ResponsiveConstants.SPACING.XS,
  },
  colorValue: {
    fontSize: ResponsiveConstants.FONT_SIZES.XS,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
  
  // Typography
  typographyItem: {
    marginBottom: ResponsiveConstants.SPACING.SM,
  },
  typographyText: {
    color: COLORS.textPrimary,
  },
  
  // Spacing
  spacingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ResponsiveConstants.SPACING.SM,
  },
  spacingBox: {
    backgroundColor: COLORS.primary,
    marginRight: ResponsiveConstants.SPACING.SM,
  },
  spacingLabel: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textPrimary,
  },
  
  // Border Radius
  borderRadiusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ResponsiveConstants.SPACING.SM,
  },
  borderRadiusBox: {
    width: Responsive.moderateScale(60),
    height: Responsive.moderateScale(40),
    backgroundColor: COLORS.secondary,
    marginRight: ResponsiveConstants.SPACING.SM,
  },
  borderRadiusLabel: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textPrimary,
  },
  
  // Configuration
  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ResponsiveConstants.SPACING.SM,
    paddingVertical: ResponsiveConstants.SPACING.SM,
    paddingHorizontal: ResponsiveConstants.SPACING.BASE,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: ResponsiveConstants.BORDER_RADIUS.BASE,
  },
  configLabel: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.MEDIUM,
    color: COLORS.textPrimary,
  },
  configValue: {
    fontSize: ResponsiveConstants.FONT_SIZES.SM,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
  },
});

export default StyleGuide; 