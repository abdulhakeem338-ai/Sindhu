import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNetworkStatus } from '../../utils/networkService/networkHook';
import getDeviceInfoOnce from '../../utils/deviceInfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppDispatch } from '../../redux/hooks';
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../../constants/constants';
import { Responsive, ResponsiveConstants } from '../../helper/responsive';

const NetworkStatusBanner = () => {
    const isConnected = useNetworkStatus();
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        getDeviceInfoOnce(dispatch);
    }, [dispatch]);

    if (isConnected) return null;
    
    const top = Platform.OS === 'ios' ? insets.top : (StatusBar?.currentHeight ?? 0);
    return (
        <View style={[styles.offlineBanner, { top }]}>
            <Text style={styles.offlineText}>No internet connection</Text>
        </View>
    );
}

export default NetworkStatusBanner

const styles = StyleSheet.create({
    offlineBanner: {
        left: 0,
        right: 0,
        backgroundColor: COLORS.error,
        padding: ResponsiveConstants.SPACING.SM,
        zIndex: 1000,
        elevation: Responsive.moderateScale(2),
        position: 'absolute',
    },
    offlineText: {
        color: COLORS.textPrimary,
        textAlign: 'center',
        fontSize: ResponsiveConstants.FONT_SIZES.XS,
        fontFamily: FONTS.MEDIUM,
    },
})