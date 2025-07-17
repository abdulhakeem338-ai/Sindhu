# Responsive Utilities

This directory contains responsive utilities that automatically scale UI elements based on device screen size and pixel density.

## Overview

The responsive utilities provide a comprehensive solution for creating adaptive layouts that work seamlessly across different device sizes, from small phones to large tablets.

## Features

- **Automatic Scaling**: Fonts, spacing, and UI elements scale based on device characteristics
- **Device Detection**: Identify device size, platform, and orientation
- **Pixel-Perfect Scaling**: Uses PixelRatio for crisp rendering on all devices
- **Integration with Constants**: Works seamlessly with the design system constants

## Usage

### Basic Import

```typescript
import { Responsive, ResponsiveConstants } from '../helper/responsive';
```

### Responsive Constants

Use `ResponsiveConstants` for automatically scaled values:

```typescript
// Responsive font sizes
const fontSize = ResponsiveConstants.FONT_SIZES.LG; // Scales automatically

// Responsive spacing
const padding = ResponsiveConstants.SPACING.BASE; // Scales automatically

// Responsive border radius
const borderRadius = ResponsiveConstants.BORDER_RADIUS.LG; // Scales automatically
```

### Manual Scaling Functions

For custom scaling needs:

```typescript
// Scale any number
const scaledSize = Responsive.moderateScale(24);

// Scale font size
const scaledFontSize = Responsive.getFontSize(16);

// Get responsive spacing
const responsiveSpacing = Responsive.getResponsiveSpacing('LG');

// Get responsive font size
const responsiveFontSize = Responsive.getResponsiveFontSize('XL');
```

## API Reference

### Responsive Object

#### Scaling Functions

```typescript
// Scale any value moderately
Responsive.moderateScale(size: number, factor?: number): number

// Scale font size
Responsive.getFontSize(size: number): number

// Get responsive font size from constants
Responsive.getResponsiveFontSize(size: keyof typeof FONT_SIZES): number

// Get responsive spacing from constants
Responsive.getResponsiveSpacing(spacing: keyof typeof SPACING): number

// Get responsive border radius from constants
Responsive.getResponsiveBorderRadius(radius: keyof typeof BORDER_RADIUS): number
```

#### Dimension Functions

```typescript
// Get height percentage
Responsive.getHeight(percentage: number): number

// Get width percentage
Responsive.getWidth(percentage: number): number

// Get aspect ratio height
Responsive.getAspectRatio(originalWidth: number, originalHeight: number): number

// Get dynamic padding
Responsive.getDynamicPadding(padding: number): number

// Get dynamic margin
Responsive.getDynamicMargin(margin: number): number
```

#### Device Detection

```typescript
// Check device size
Responsive.isSmallDevice(): boolean    // width < 360
Responsive.isMediumDevice(): boolean   // 360 <= width <= 768
Responsive.isLargeDevice(): boolean    // width > 768
Responsive.isExtraLargeDevice(): boolean // width > 1024

// Check platform
Responsive.isIOS(): boolean
Responsive.isAndroid(): boolean

// Check orientation
Responsive.getOrientation(): 'portrait' | 'landscape'
Responsive.isPortrait(): boolean
Responsive.isLandscape(): boolean
```

#### Utility Functions

```typescript
// Get screen dimensions
Responsive.getScreenDimensions(): { width: number; height: number }

// Get scale factors
Responsive.getScaleFactor(): number
Responsive.getHorizontalScale(): number
Responsive.getVerticalScale(): number
```

### ResponsiveConstants Object

Pre-calculated responsive values that automatically scale:

```typescript
ResponsiveConstants.FONT_SIZES = {
  XS: number,      // Responsive 12px
  SM: number,      // Responsive 14px
  BASE: number,    // Responsive 16px
  LG: number,      // Responsive 18px
  XL: number,      // Responsive 20px
  XXL: number,     // Responsive 24px
  XXXL: number,    // Responsive 32px
  DISPLAY: number, // Responsive 48px
}

ResponsiveConstants.SPACING = {
  XS: number,      // Responsive 4px
  SM: number,      // Responsive 8px
  BASE: number,    // Responsive 16px
  LG: number,      // Responsive 24px
  XL: number,      // Responsive 32px
  XXL: number,     // Responsive 48px
  XXXL: number,    // Responsive 64px
}

ResponsiveConstants.BORDER_RADIUS = {
  SM: number,      // Responsive 4px
  BASE: number,    // Responsive 8px
  LG: number,      // Responsive 12px
  XL: number,      // Responsive 16px
  XXL: number,     // Responsive 24px
  FULL: number,    // Responsive 9999px
}
```

## Examples

### Component Styling

```typescript
import { StyleSheet } from 'react-native';
import { Responsive, ResponsiveConstants } from '../helper/responsive';

const styles = StyleSheet.create({
  container: {
    padding: ResponsiveConstants.SPACING.BASE,
    borderRadius: ResponsiveConstants.BORDER_RADIUS.LG,
  },
  title: {
    fontSize: ResponsiveConstants.FONT_SIZES.XL,
    marginBottom: ResponsiveConstants.SPACING.LG,
  },
  icon: {
    width: Responsive.moderateScale(24),
    height: Responsive.moderateScale(24),
  },
});
```

### Conditional Styling

```typescript
const getContainerStyle = () => {
  const baseStyle = {
    padding: ResponsiveConstants.SPACING.BASE,
  };

  if (Responsive.isSmallDevice()) {
    return {
      ...baseStyle,
      paddingHorizontal: ResponsiveConstants.SPACING.SM,
    };
  }

  if (Responsive.isLargeDevice()) {
    return {
      ...baseStyle,
      paddingHorizontal: ResponsiveConstants.SPACING.XL,
    };
  }

  return baseStyle;
};
```

### Orientation Handling

```typescript
const getLayoutStyle = () => {
  if (Responsive.isLandscape()) {
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
    };
  }

  return {
    flexDirection: 'column',
    alignItems: 'center',
  };
};
```

### Platform-Specific Styling

```typescript
const getPlatformStyle = () => {
  const baseStyle = {
    borderRadius: ResponsiveConstants.BORDER_RADIUS.BASE,
  };

  if (Responsive.isIOS()) {
    return {
      ...baseStyle,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: Responsive.moderateScale(2) },
      shadowOpacity: 0.1,
      shadowRadius: Responsive.moderateScale(4),
    };
  }

  return {
    ...baseStyle,
    elevation: Responsive.moderateScale(3),
  };
};
```

## Best Practices

### 1. Use ResponsiveConstants for Design System Elements

```typescript
// ✅ Good - Uses responsive constants
fontSize: ResponsiveConstants.FONT_SIZES.LG

// ❌ Avoid - Hardcoded values
fontSize: 18
```

### 2. Use moderateScale for Custom Sizes

```typescript
// ✅ Good - Scales appropriately
width: Responsive.moderateScale(24)

// ❌ Avoid - May not scale well
width: 24
```

### 3. Handle Device Differences

```typescript
// ✅ Good - Adapts to device size
const padding = Responsive.isSmallDevice() 
  ? ResponsiveConstants.SPACING.SM 
  : ResponsiveConstants.SPACING.BASE;

// ❌ Avoid - Same for all devices
const padding = 16;
```

### 4. Consider Orientation Changes

```typescript
// ✅ Good - Handles orientation
const layoutStyle = Responsive.isPortrait() 
  ? { flexDirection: 'column' }
  : { flexDirection: 'row' };
```

### 5. Platform-Specific Optimizations

```typescript
// ✅ Good - Platform-aware styling
const shadowStyle = Responsive.isIOS() 
  ? { shadowColor: '#000', shadowOffset: {...} }
  : { elevation: 3 };
```

## Scale Calculation

The responsive system uses iPhone X (375x812) as the base design size:

```typescript
const guidelineBaseWidth = 375;  // iPhone X width
const guidelineBaseHeight = 812; // iPhone X height

const horizontalScale = width / guidelineBaseWidth;
const verticalScale = height / guidelineBaseHeight;
const moderateScaleFactor = (horizontalScale + verticalScale) / 2;
```

This ensures consistent scaling across all device sizes while maintaining the design integrity.

## Integration with Constants

The responsive utilities are designed to work seamlessly with the design system constants:

```typescript
// Constants provide base values
FONT_SIZES.LG = 18

// Responsive utilities scale them
ResponsiveConstants.FONT_SIZES.LG = Responsive.getFontSize(18)
```

This creates a unified system where all design tokens automatically adapt to different screen sizes.

## Performance Considerations

- `ResponsiveConstants` are calculated once at module load
- Use `ResponsiveConstants` for static values in StyleSheet
- Use `Responsive` functions for dynamic calculations
- Avoid calling responsive functions in render methods for static values

## Migration Guide

When updating existing components:

1. Replace hardcoded sizes with `ResponsiveConstants`
2. Use `Responsive.moderateScale()` for custom dimensions
3. Add device-specific logic where needed
4. Test on multiple device sizes and orientations 