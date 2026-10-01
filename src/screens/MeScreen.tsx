import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { STUDENT, examStamp, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCampusLocation } from '@hooks/useCampusLocation';
import { useAuthStore } from '@stores/authStore';
import { Watermark } from '@components/Watermark';

export const MeScreen = ({ navigation }: any) => {
    const logout = useAuthStore((state) => state.logout);
    const { status, distanceKm, shipFee, requestLocation, openSettings } =
        useCampusLocation();

    useEffect(() => {
        if (shipFee !== null) {
            navigation.setParams({ shipFee });
        }
    }, [shipFee, navigation]);

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.name}>{STUDENT.hoTen}</Text>
                <Text style={styles.sub}>{STUDENT.mssv} · #{examStamp()}</Text>

                <View style={styles.card}>
                    <Text style={styles.statusText}>
                        Quyền: <Text style={{ fontWeight: 'bold' }}>{status}</Text>
                    </Text>
                    {distanceKm !== null && (
                        <Text style={styles.infoText}>
                            ≈ {distanceKm.toFixed(1)} km tới cổng KTX
                        </Text>
                    )}
                    {shipFee !== null && (
                        <View style={{ marginTop: 8 }}>
                            <Text style={styles.feeLabel}>Phí ship ước tính</Text>
                            <Text style={styles.feeValue}>{shipFee.toLocaleString('vi-VN')} đ</Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity style={styles.btnPrimary} onPress={requestLocation}>
                    <Text style={styles.btnPrimaryText}>Lấy vị trí ước tính ship</Text>
                </TouchableOpacity>

                {status === 'blocked' && (
                    <TouchableOpacity style={styles.btnOutline} onPress={openSettings}>
                        <Text style={styles.btnOutlineText}>Mở Cài đặt (blocked)</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.btnLogout} onPress={logout}>
                    <Text style={styles.btnLogoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

            {!VARIANT.watermarkAtTop && <Watermark />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.primary,
        padding: 16,
        alignItems: 'center',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    sub: {
        fontSize: 12,
        color: COLORS.textLight,
        marginBottom: 16,
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
    },
    statusText: {
        fontSize: 14,
        color: COLORS.success,
    },
    infoText: {
        fontSize: 13,
        color: COLORS.text,
        marginTop: 4,
    },
    feeLabel: {
        fontSize: 12,
        color: COLORS.textLight,
    },
    feeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.secondary,
    },
    btnPrimary: {
        width: '100%',
        backgroundColor: COLORS.primary,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    btnPrimaryText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    btnOutline: {
        width: '100%',
        borderColor: COLORS.primary,
        borderWidth: 1,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    btnOutlineText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    btnLogout: {
        width: '100%',
        backgroundColor: COLORS.error,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
    },
    btnLogoutText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});