import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Watermark } from '@components/Watermark';
import { ROOM_LABEL, VARIANT, PRICE_MULTIPLIER } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useCartStore } from '@stores/cartStore';

export const CartScreen = () => {
    const { cart, changeQuantity, removeFromCart, getTotalAmount } = useCartStore();

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>GIỎ HÀNG</Text>
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
                </View>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => String(item.product.id)}
                    renderItem={({ item }) => {
                        const itemPrice = Math.round(item.product.price * PRICE_MULTIPLIER);
                        return (
                            <View style={styles.itemRow}>
                                <Image
                                    source={{ uri: item.product.image }}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                                <View style={styles.itemDetails}>
                                    <Text style={styles.itemTitle} numberOfLines={1}>
                                        {item.product.title}
                                    </Text>
                                    <Text style={styles.itemPrice}>
                                        {itemPrice.toLocaleString('vi-VN')} đ
                                    </Text>
                                    <View style={styles.qtyRow}>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => changeQuantity(item.product.id, -1)}>
                                            <Text style={styles.qtyBtnText}>-</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.qtyBtn}
                                            onPress={() => changeQuantity(item.product.id, 1)}>
                                            <Text style={styles.qtyBtnText}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.deleteBtn}
                                    onPress={() => removeFromCart(item.product.id)}>
                                    <Text style={styles.deleteText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            )}

            <View style={styles.summaryCard}>
                <Text style={styles.roomText}>Giao đến {ROOM_LABEL}</Text>
                <Text style={styles.totalText}>
                    Tổng hàng: {getTotalAmount().toLocaleString('vi-VN')} đ
                </Text>
            </View>

            {!VARIANT.watermarkAtTop && <Watermark />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { backgroundColor: COLORS.primary, padding: 16, alignItems: 'center' },
    headerTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        color: COLORS.textLight,
        fontSize: 16,
    },
    itemRow: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        padding: 12,
        marginHorizontal: 12,
        marginTop: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 6,
        backgroundColor: '#FFF',
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        color: COLORS.text,
        fontWeight: 'bold',
        fontSize: 14,
    },
    itemPrice: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 2,
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    qtyBtn: {
        width: 24,
        height: 24,
        backgroundColor: COLORS.background,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    qtyBtnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        lineHeight: 16,
    },
    qtyText: {
        marginHorizontal: 8,
        fontSize: 13,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    deleteBtn: {
        backgroundColor: COLORS.error,
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    deleteText: { color: '#FFF' },
    summaryCard: {
        backgroundColor: COLORS.surface,
        margin: 12,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.secondary,
    },
    roomText: { color: COLORS.text, fontWeight: 'bold' },
    totalText: { color: COLORS.primary, fontWeight: 'bold', fontSize: 16, marginTop: 4 },
});