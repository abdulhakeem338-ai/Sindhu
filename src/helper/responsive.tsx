import { Dimensions, PixelRatio, Platform } from 'react-native';
import { FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/constants';

const { height, width } = Dimensions.get('window');

// Base scale calculation based on iPhone X dimensions
const guidelineBaseWidth = 375; // iPhone X width
const guidelineBaseHeight = 812; // iPhone X height

const horizontalScale = width / guidelineBaseWidth;
const verticalScale = height / guidelineBaseHeight;
const moderateScaleFactor = (horizontalScale + verticalScale) / 2;

export const Responsive = {
  /**
   * Get height in percentage as per device total height
   * @param {number} h - height percentage
   * @returns {number} - calculated height
   */
  getHeight: (h: number): number => {
    return PixelRatio.roundToNearestPixel(height * (h / 100));
  },

  /**
   * Get width in percentage as per device total width
   * @param {number} w - width percentage
   * @returns {number} - calculated width
   */
  getWidth: (w: number): number => {
    return PixelRatio.roundToNearestPixel(width * (w / 100));
  },

  /**
   * Scale font size based on screen width and device pixel ratio
   * @param {number} size - font size
   * @returns {number} - scaled font size
   */
  getFontSize: (size: number): number => {
    return Math.round(PixelRatio.roundToNearestPixel(size * moderateScaleFactor));
  },

  /**
   * Moderately scale values for UI components like padding, margin, borderRadius, etc.
   * @param {number} size - base size
   * @param {number} factor - scaling factor (default is 0.5)
   * @returns {number} - scaled size
   */
  moderateScale: (size: number, factor: number = 0.5): number => {
    return Math.round(PixelRatio.roundToNearestPixel(size + (size * (moderateScaleFactor - 1) * factor)));
  },

  /**
   * Maintain aspect ratio for images and other elements
   * @param {number} originalWidth - original width
   * @param {number} originalHeight - original height
   * @returns {number} - calculated height to maintain aspect ratio
   */
  getAspectRatio: (originalWidth: number, originalHeight: number): number => {
    return (originalHeight / originalWidth) * width;
  },

  /**
   * Dynamic padding adjustment based on screen size
   * @param {number} padding - base padding size
   * @returns {number} - adjusted padding size
   */
  getDynamicPadding: (padding: number): number => {
    return Math.round(padding * moderateScaleFactor);
  },

  /**
   * Dynamic margin adjustment based on screen size
   * @param {number} margin - base margin size
   * @returns {number} - adjusted margin size
   */
  getDynamicMargin: (margin: number): number => {
    return Math.round(margin * moderateScaleFactor);
  },

  /**
   * Responsive font sizes using constants
   * @param {keyof typeof FONT_SIZES} size - font size key
   * @returns {number} - responsive font size
   */
  getResponsiveFontSize: (size: keyof typeof FONT_SIZES): number => {
    const baseSize = FONT_SIZES[size];
    return Responsive.getFontSize(baseSize);
  },

  /**
   * Responsive spacing using constants
   * @param {keyof typeof SPACING} spacing - spacing key
   * @returns {number} - responsive spacing
   */
  getResponsiveSpacing: (spacing: keyof typeof SPACING): number => {
    const baseSpacing = SPACING[spacing];
    return Responsive.moderateScale(baseSpacing);
  },

  /**
   * Responsive border radius using constants
   * @param {keyof typeof BORDER_RADIUS} radius - border radius key
   * @returns {number} - responsive border radius
   */
  getResponsiveBorderRadius: (radius: keyof typeof BORDER_RADIUS): number => {
    const baseRadius = BORDER_RADIUS[radius];
    return Responsive.moderateScale(baseRadius);
  },

  /**
   * Check if the device is small (width < 360)
   * @returns {boolean} - true if the device is small
   */
  isSmallDevice: (): boolean => {
    return width < 360;
  },

  /**
   * Check if the device is medium (width between 360 and 768)
   * @returns {boolean} - true if the device is medium
   */
  isMediumDevice: (): boolean => {
    return width >= 360 && width <= 768;
  },

  /**
   * Check if the device is large (width > 768)
   * @returns {boolean} - true if the device is large
   */
  isLargeDevice: (): boolean => {
    return width > 768;
  },

  /**
   * Check if the device is extra large (width > 1024)
   * @returns {boolean} - true if the device is extra large
   */
  isExtraLargeDevice: (): boolean => {
    return width > 1024;
  },

  /**
   * Check if the device is iOS
   * @returns {boolean} - true if the device is running iOS
   */
  isIOS: (): boolean => {
    return Platform.OS === 'ios';
  },

  /**
   * Check if the device is Android
   * @returns {boolean} - true if the device is running Android
   */
  isAndroid: (): boolean => {
    return Platform.OS === 'android';
  },

  /**
   * Get device orientation
   * @returns {'portrait' | 'landscape'} - device orientation
   */
  getOrientation: (): 'portrait' | 'landscape' => {
    return width < height ? 'portrait' : 'landscape';
  },

  /**
   * Check if device is in portrait mode
   * @returns {boolean} - true if device is in portrait
   */
  isPortrait: (): boolean => {
    return Responsive.getOrientation() === 'portrait';
  },

  /**
   * Check if device is in landscape mode
   * @returns {boolean} - true if device is in landscape
   */
  isLandscape: (): boolean => {
    return Responsive.getOrientation() === 'landscape';
  },

  /**
   * Get responsive screen dimensions
   * @returns {{ width: number; height: number }} - screen dimensions
   */
  getScreenDimensions: () => {
    return { width, height };
  },

  /**
   * Get responsive scale factor
   * @returns {number} - current scale factor
   */
  getScaleFactor: (): number => {
    return moderateScaleFactor;
  },

  /**
   * Get responsive horizontal scale
   * @returns {number} - horizontal scale factor
   */
  getHorizontalScale: (): number => {
    return horizontalScale;
  },

  /**
   * Get responsive vertical scale
   * @returns {number} - vertical scale factor
   */
  getVerticalScale: (): number => {
    return verticalScale;
  },
};

// Responsive constants that automatically scale with device
export const ResponsiveConstants = {
  // Responsive font sizes
  FONT_SIZES: {
    XS: Responsive.getResponsiveFontSize('XS'),
    SM: Responsive.getResponsiveFontSize('SM'),
    BASE: Responsive.getResponsiveFontSize('BASE'),
    LG: Responsive.getResponsiveFontSize('LG'),
    XL: Responsive.getResponsiveFontSize('XL'),
    XXL: Responsive.getResponsiveFontSize('XXL'),
    XXXL: Responsive.getResponsiveFontSize('XXXL'),
    DISPLAY: Responsive.getResponsiveFontSize('DISPLAY'),
  },

  // Responsive spacing
  SPACING: {
    XS: Responsive.getResponsiveSpacing('XS'),
    SM: Responsive.getResponsiveSpacing('SM'),
    BASE: Responsive.getResponsiveSpacing('BASE'),
    LG: Responsive.getResponsiveSpacing('LG'),
    XL: Responsive.getResponsiveSpacing('XL'),
    XXL: Responsive.getResponsiveSpacing('XXL'),
    XXXL: Responsive.getResponsiveSpacing('XXXL'),
  },

  // Responsive border radius
  BORDER_RADIUS: {
    SM: Responsive.getResponsiveBorderRadius('SM'),
    BASE: Responsive.getResponsiveBorderRadius('BASE'),
    LG: Responsive.getResponsiveBorderRadius('LG'),
    XL: Responsive.getResponsiveBorderRadius('XL'),
    XXL: Responsive.getResponsiveBorderRadius('XXL'),
    FULL: Responsive.getResponsiveBorderRadius('FULL'),
  },
};

export default Responsive;

