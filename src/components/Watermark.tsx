import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STUDENT, examStamp } from '../constants/student';
import { COLORS } from '../constants/theme';

export const Watermark = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                TH2 · {STUDENT.mssv} · {STUDENT.hoTen} · #{examStamp()}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DBEAFE',
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.text,
    },
});