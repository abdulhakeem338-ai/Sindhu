# Design System & Constants

This directory contains the centralized design system and constants for the Sindhu React Native app.

## Overview

The constants are organized into logical groups to maintain consistency across the entire application:

- **Colors**: Complete color palette with semantic naming
- **Typography**: Font families and sizes
- **Spacing**: Consistent spacing scale
- **Border Radius**: Standardized border radius values
- **Gradients**: Predefined gradient configurations
- **Configuration**: App-wide configuration values

## Usage

### Importing Constants

```typescript
import { 
  COLORS, 
  FONTS, 
  FONT_SIZES, 
  SPACING, 
  BORDER_RADIUS, 
  GRADIENT, 
  CONFIG 
} from '../constants/constants';
```

### Colors

The color system includes semantic colors for different use cases:

```typescript
// Primary colors
COLORS.primary        // Main brand color
COLORS.secondary      // Secondary brand color
COLORS.secondaryDark  // Darker variant of secondary

// Background colors
COLORS.background     // Main app background
COLORS.backgroundLight // Light background for cards/surfaces
COLORS.surface        // Surface color for elevated elements

// Text colors
COLORS.textPrimary    // Primary text color
COLORS.textSecondary  // Secondary text color
COLORS.textMuted      // Muted text color

// Status colors
COLORS.success        // Success states
COLORS.error          // Error states
COLORS.warning        // Warning states
COLORS.info           // Info states

// Border colors
COLORS.border         // Standard border color

// Gradient colors
COLORS.gradientStart  // Start color for gradients
COLORS.gradientEnd    // End color for gradients

// Social login colors
COLORS.google         // Google brand colors
COLORS.apple          // Apple brand colors
COLORS.facebook       // Facebook brand colors

// Transparent colors
COLORS.whiteTransparent10  // 10% white overlay
COLORS.whiteTransparent20  // 20% white overlay
```

### Typography

Use the predefined font families and sizes:

```typescript
// Font Families
FONTS.THIN           // SF Pro Rounded Thin
FONTS.LIGHT          // SF Pro Rounded Light
FONTS.REGULAR        // SF Pro Rounded Regular
FONTS.MEDIUM         // SF Pro Rounded Medium
FONTS.SEMIBOLD       // SF Pro Rounded Semibold
FONTS.BOLD           // SF Pro Rounded Bold
FONTS.EXTRA_BOLD     // SF Pro Rounded Extra Bold
FONTS.HEAVY          // SF Pro Rounded Heavy

// Font Sizes
FONT_SIZES.XS        // 12px
FONT_SIZES.SM        // 14px
FONT_SIZES.BASE      // 16px
FONT_SIZES.LG        // 18px
FONT_SIZES.XL        // 20px
FONT_SIZES.XXL       // 24px
FONT_SIZES.XXXL      // 32px
FONT_SIZES.DISPLAY   // 48px
```

### Spacing

Consistent spacing scale for margins, padding, and layout:

```typescript
SPACING.XS           // 4px
SPACING.SM           // 8px
SPACING.BASE         // 16px
SPACING.LG           // 24px
SPACING.XL           // 32px
SPACING.XXL          // 48px
SPACING.XXXL         // 64px
```

### Border Radius

Standardized border radius values:

```typescript
BORDER_RADIUS.SM     // 4px
BORDER_RADIUS.BASE   // 8px
BORDER_RADIUS.LG     // 12px
BORDER_RADIUS.XL     // 16px
BORDER_RADIUS.XXL    // 24px
BORDER_RADIUS.FULL   // 9999px (circular)
```

### Gradients

Predefined gradient configurations:

```typescript
// Gradient Colors
GRADIENT.COLORS.PRIMARY    // [COLORS.gradientStart, COLORS.gradientEnd]
GRADIENT.COLORS.SECONDARY  // [COLORS.secondary, COLORS.secondaryDark]
GRADIENT.COLORS.DISABLED   // [COLORS.textMuted, COLORS.textMuted]

// Gradient Positions
GRADIENT.POSITION.DIAGONAL   // Diagonal gradient
GRADIENT.POSITION.HORIZONTAL // Horizontal gradient
GRADIENT.POSITION.VERTICAL   // Vertical gradient
```

### Configuration

App-wide configuration values:

```typescript
CONFIG.ANIMATION_DURATION  // 300ms
CONFIG.DEBOUNCE_DELAY      // 500ms
CONFIG.NETWORK_TIMEOUT     // 10000ms
```

## Examples

### Styling a Component

```typescript
import { StyleSheet } from 'react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../constants/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.BASE,
    borderRadius: BORDER_RADIUS.BASE,
  },
  title: {
    fontSize: FONT_SIZES.XL,
    fontFamily: FONTS.BOLD,
    color: COLORS.textPrimary,
    marginBottom: SPACING.LG,
  },
  description: {
    fontSize: FONT_SIZES.BASE,
    fontFamily: FONTS.REGULAR,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});
```

### Using Gradients

```typescript
import LinearGradient from 'react-native-linear-gradient';
import { GRADIENT } from '../constants/constants';

<LinearGradient
  colors={GRADIENT.COLORS.PRIMARY}
  start={GRADIENT.POSITION.HORIZONTAL.start}
  end={GRADIENT.POSITION.HORIZONTAL.end}
  style={styles.gradient}
/>
```

### Social Login Configuration

```typescript
import { SOCIAL_DETAIL } from '../constants/constants';

const googleConfig = SOCIAL_DETAIL.GOOGLE;
// Returns: { name: 'Google', icon: 'logo-google', color: '#DB4437', ... }
```

## Best Practices

1. **Always use constants**: Never hardcode colors, fonts, or spacing values
2. **Semantic naming**: Use semantic color names (e.g., `COLORS.primary` instead of `COLORS.blue`)
3. **Consistent spacing**: Use the spacing scale for all margins and padding
4. **Typography hierarchy**: Use appropriate font sizes and weights for different text elements
5. **Accessibility**: Ensure sufficient color contrast between text and background colors

## Style Guide

For a visual reference of all constants, use the `StyleGuide` component:

```typescript
import StyleGuide from '../constants/StyleGuide';

// Add this to your navigation for development
<Stack.Screen name="StyleGuide" component={StyleGuide} />
```

## Adding New Constants

When adding new constants:

1. Follow the existing naming conventions
2. Add them to the appropriate section
3. Update the exports in `constants.ts`
4. Document them in this README
5. Add examples to the StyleGuide component

## Migration Guide

If you're updating existing components:

1. Replace hardcoded colors with `COLORS` constants
2. Replace hardcoded spacing with `SPACING` constants
3. Replace hardcoded fonts with `FONTS` and `FONT_SIZES` constants
4. Replace hardcoded border radius with `BORDER_RADIUS` constants
5. Update gradient configurations to use `GRADIENT` constants 