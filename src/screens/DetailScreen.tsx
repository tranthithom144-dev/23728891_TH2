import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { STUDENT, PRICE_MULTIPLIER, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';
import { Watermark } from '@components/Watermark';

export const DetailScreen = ({ route, navigation }: any) => {
    const { product } = route.params || {};
    const addToCart = useCartStore((state) => state.addToCart);

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>Không tìm thấy dữ liệu món!</Text>
            </View>
        );
    }

    const displayPrice =
        Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';

    const handleAdd = () => {
        addToCart(product);
        if (VARIANT.hapticOnAdd === 'impact') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
            Haptics.selectionAsync();
        }
        Alert.alert('Thành công', `Đã thêm vào giỏ hàng! [${STUDENT.mssv}]`);
    };

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.content}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Chi tiết món</Text>
                </TouchableOpacity>

                <View style={styles.imageBox}>
                    <Image style={styles.image} source={{ uri: product.image }} resizeMode="contain" />
                </View>

                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{displayPrice}</Text>
                <Text style={styles.subtext}>Giao nội khu · nhận tận phòng</Text>

                <Text style={styles.desc} numberOfLines={3}>
                    {product.description}
                </Text>

                <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                    <Text style={styles.addBtnText}>Thêm vào giỏ · Haptic</Text>
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
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    backBtn: {
        marginBottom: 12,
    },
    backText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    imageBox: {
        height: 180,
        backgroundColor: '#FEF08A',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    image: {
        width: '70%',
        height: '70%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        textAlign: 'center',
        marginVertical: 4,
    },
    subtext: {
        fontSize: 12,
        color: COLORS.textLight,
        textAlign: 'center',
        marginBottom: 16,
    },
    desc: {
        fontSize: 13,
        color: COLORS.textLight,
        marginBottom: 24,
    },
    addBtn: {
        backgroundColor: COLORS.primary,
        height: 48,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});