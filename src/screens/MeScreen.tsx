import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT, examStamp } from '../constants/student';
import { useAuthStore } from '../stores/authStore';
import { useLocationStore } from '../stores/locationStore';
import { Watermark } from '../components/Watermark';

export const MeScreen = () => {
    const logout = useAuthStore((state) => state.logout);
    const { status, distanceKm, shipFee, requestLocation, openSettings } = useLocationStore();

    const displayDistance = distanceKm !== null ? distanceKm.toFixed(1) : '1.2';
    const displayShipFee = shipFee !== null ? shipFee.toLocaleString('vi-VN') + ' đ' : '12.000 đ';

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Watermark />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.name}>{STUDENT.hoTen}</Text>
                <Text style={styles.sub}>
                    {STUDENT.mssv} · #{examStamp()}
                </Text>

                <View style={styles.card}>
                    <Text style={styles.statusLine}>
                        Quyền: <Text style={styles.statusValue}>{status === 'idle' ? 'granted' : status}</Text>
                    </Text>
                    <Text style={styles.infoText}>≈ {displayDistance} km tới cổng KTX</Text>
                    <View style={styles.feeSection}>
                        <Text style={styles.feeLabel}>Phí ship ước tính</Text>
                        <Text style={styles.feeValue}>{displayShipFee}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.btnPrimary} activeOpacity={0.8} onPress={requestLocation}>
                    <Text style={styles.btnPrimaryText}>Lấy vị trí ước tính ship</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnOutline} activeOpacity={0.8} onPress={openSettings}>
                    <Text style={styles.btnOutlineText}>Mở Cài đặt (blocked)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnLogout} activeOpacity={0.8} onPress={logout}>
                    <Text style={styles.btnLogoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF6FF',
    },
    header: {
        backgroundColor: '#1D4ED8',
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E3A8A',
        textAlign: 'center',
    },
    sub: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    statusLine: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 4,
    },
    statusValue: {
        fontWeight: 'bold',
        color: '#16A34A',
    },
    infoText: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 12,
    },
    feeSection: {
        marginTop: 2,
    },
    feeLabel: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 2,
    },
    feeValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#EA580C',
    },
    btnPrimary: {
        backgroundColor: '#2563EB',
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    btnPrimaryText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    btnOutline: {
        backgroundColor: '#FFFFFF',
        borderColor: '#2563EB',
        borderWidth: 1.5,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    btnOutlineText: {
        color: '#2563EB',
        fontWeight: 'bold',
        fontSize: 15,
    },
    btnLogout: {
        backgroundColor: '#DC2626',
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnLogoutText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default MeScreen;