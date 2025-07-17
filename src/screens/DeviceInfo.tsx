import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { COLORS, FONTS, FONT_SIZES, SPACING } from '../constants/constants'
import { Responsive, ResponsiveConstants } from '../helper/responsive'

const DeviceInfo = () => {
    const devicesInfo = useSelector((state: RootState) => state.cacheState.devicesInfo);
  return (
        <View style={styles.container}>
        <Text style={styles.text}>{JSON.stringify(devicesInfo, null, 2)}</Text>
    </View>
  )
}

export default DeviceInfo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: ResponsiveConstants.SPACING.LG,
        backgroundColor: COLORS.background,
    },
    text: {
        color: COLORS.textPrimary,
        fontSize: ResponsiveConstants.FONT_SIZES.LG,
        fontFamily: FONTS.BOLD,
        alignSelf: 'flex-start',
    },
})