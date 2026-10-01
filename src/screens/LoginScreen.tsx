import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { STUDENT, VARIANT } from '../constants/student';
import { Watermark } from '../components/Watermark';
import { useAuthStore } from '../stores/authStore';

export const LoginScreen = () => {
    const [value, setValue] = useState('0867457005');
    const login = useAuthStore((state) => state.login);

    const placeholder =
        VARIANT.authField === 'email' ? 'Email — student@iuh.edu.vn' : 'Số điện thoại — 0867457005';

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Watermark />

            <View style={styles.content}>
                <Text style={styles.title}>KTXGO</Text>
                <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#64748B"
                    value={value}
                    onChangeText={setValue}
                    keyboardType={VARIANT.authField === 'email' ? 'email-address' : 'phone-pad'}
                />

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => login(value)}>
                    <Text style={styles.buttonText}>Vào cửa hàng</Text>
                </TouchableOpacity>

                <Text style={styles.footerNote}>Auth Stack · chưa có token</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF6FF',
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
        color: '#1D4ED8',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 32,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFFFFF',
        borderColor: '#BFDBFE',
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#1E3A8A',
        marginBottom: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#1D4ED8',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerNote: {
        fontSize: 12,
        color: '#64748B',
    },
});