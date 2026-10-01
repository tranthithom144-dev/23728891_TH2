import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@constants/theme';
import { STUDENT, VARIANT } from '@constants/student';
import { Watermark } from '@components/Watermark';
import { useAuthStore } from '@stores/authStore';

export const LoginScreen = () => {
    const [value, setValue] = useState('');
    const login = useAuthStore((state) => state.login);

    const placeholder =
        VARIANT.authField === 'email'
            ? `Email — ${STUDENT.mssv}@iuh.edu.vn`
            : `Số điện thoại — 09${STUDENT.mssv.slice(-8)}`;

    return (
        <SafeAreaView style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.content}>
                <Text style={styles.title}>KTXGO</Text>
                <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textLight}
                    value={value}
                    onChangeText={setValue}
                    keyboardType={VARIANT.authField === 'email' ? 'email-address' : 'phone-pad'}
                />

                <TouchableOpacity style={styles.button} onPress={() => login(value)}>
                    <Text style={styles.buttonText}>Vào cửa hàng</Text>
                </TouchableOpacity>

                <Text style={styles.footerNote}>Auth Stack · chưa có token</Text>
            </View>

            {!VARIANT.watermarkAtTop && <Watermark />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 32,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerNote: {
        fontSize: 12,
        color: COLORS.textLight,
    },
});