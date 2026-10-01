import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Haptics } from '../services/haptics';
import { STUDENT, PRICE_MULTIPLIER, VARIANT } from '../constants/student';
import { useCartStore } from '../stores/cartStore';
import { Watermark } from '../components/Watermark';

const PASTEL_COLORS = ['#FEF3C7', '#DBEAFE', '#DCFCE7', '#FFE4E6', '#F3E8FF', '#FFEDD5'];

export const DetailScreen = ({ route, navigation }: any) => {
    const { product } = route.params || {};
    const addToCart = useCartStore((state) => state.addToCart);

    if (!product) {
        return (
            <SafeAreaView style={styles.container}>
                <Watermark />
                <View style={styles.center}>
                    <Text style={styles.errorText}>Không tìm thấy dữ liệu món!</Text>
                </View>
            </SafeAreaView>
        );
    }

    const displayPrice =
        Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';

    const handleAdd = () => {
        addToCart(product);
        try {
            if (VARIANT.hapticOnAdd === 'impact') {
                Haptics?.impactAsync?.(Haptics.ImpactFeedbackStyle.Medium);
            } else {
                Haptics?.selectionAsync?.();
            }
        } catch (_e) {
            // ignore haptics error on emulator
        }
        Alert.alert('Thành công', `Đã thêm vào giỏ hàng! [${STUDENT.mssv}]`);
    };

    const bgColor = PASTEL_COLORS[(product.id - 1) % PASTEL_COLORS.length];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Watermark />

            <View style={styles.headerNav}>
                <TouchableOpacity
                    style={styles.backBtn}
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>← Chi tiết món</Text>
                </TouchableOpacity>
                <Text style={styles.stackBadge}>Stack</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={[styles.imageBox, { backgroundColor: bgColor }]}>
                    {product.image ? (
                        <Image style={styles.image} source={{ uri: product.image }} resizeMode="cover" />
                    ) : (
                        <View style={styles.fallbackGraphic}>
                            <View style={styles.oval} />
                            <View style={styles.rectangle} />
                        </View>
                    )}
                </View>

                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{displayPrice}</Text>
                <Text style={styles.subtext}>Giao nội khu · nhận tận phòng</Text>

                <Text style={styles.desc} numberOfLines={3}>
                    {product.description ||
                        `Mô tả ngắn từ API (tối đa 3 dòng).\nGiữ nguyên id từ route.params.`}
                </Text>

                <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={handleAdd}>
                    <Text style={styles.addBtnText}>Thêm vào giỏ · Haptic</Text>
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
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 15,
        color: '#1E3A8A',
    },
    headerNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
    },
    backBtn: {
        paddingVertical: 4,
    },
    backText: {
        fontSize: 16,
        color: '#1D4ED8',
        fontWeight: 'bold',
    },
    stackBadge: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#EA580C',
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    imageBox: {
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    fallbackGraphic: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    oval: {
        width: '65%',
        height: '45%',
        borderRadius: 50,
        backgroundColor: '#93C5FD',
        position: 'absolute',
    },
    rectangle: {
        width: '50%',
        height: '24%',
        borderRadius: 6,
        backgroundColor: '#1D4ED8',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1E3A8A',
        textAlign: 'center',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D4ED8',
        textAlign: 'center',
        marginTop: 4,
    },
    subtext: {
        fontSize: 12,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 16,
    },
    desc: {
        fontSize: 13,
        color: '#64748B',
        lineHeight: 18,
        marginBottom: 24,
    },
    addBtn: {
        backgroundColor: '#1D4ED8',
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default DetailScreen;