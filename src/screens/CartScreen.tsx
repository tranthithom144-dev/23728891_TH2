import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Watermark } from '../components/Watermark';
import { ROOM_LABEL, VARIANT, PRICE_MULTIPLIER, BASE_SHIP_FEE } from '../constants/student';
import { useCartStore } from '../stores/cartStore';
import { useLocationStore } from '../stores/locationStore';

export const CartScreen = () => {
    const { cart, changeQuantity, removeFromCart, getTotalAmount } = useCartStore();
    const shipFee = useLocationStore((state) => state.shipFee);

    // Default displayed ship fee if location hasn't been fetched yet
    const displayShipFee = shipFee !== null ? shipFee : BASE_SHIP_FEE + 3000;
    const totalAmount = getTotalAmount();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Watermark />

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
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => {
                        const itemPrice = Math.round(item.product.price * PRICE_MULTIPLIER);
                        const itemTotal = itemPrice * item.quantity;
                        return (
                            <View style={styles.itemCard}>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemTitle} numberOfLines={1}>
                                        {item.product.title}
                                    </Text>
                                    <View style={styles.qtyPriceRow}>
                                        <View style={styles.qtyControl}>
                                            <TouchableOpacity
                                                style={styles.qtySmallBtn}
                                                activeOpacity={0.7}
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                                onPress={() => changeQuantity(item.product.id, -1)}>
                                                <Text style={styles.qtySmallText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.itemQty}>×{item.quantity}</Text>
                                            <TouchableOpacity
                                                style={styles.qtySmallBtn}
                                                activeOpacity={0.7}
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                                onPress={() => changeQuantity(item.product.id, 1)}>
                                                <Text style={styles.qtySmallText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.itemPrice}>
                                            {itemTotal.toLocaleString('vi-VN')} đ
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.deleteBtn}
                                    activeOpacity={0.8}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    onPress={() => removeFromCart(item.product.id)}>
                                    <Text style={styles.deleteIcon}>🗑</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            )}

            <View style={styles.summaryBox}>
                <Text style={styles.summaryRoom}>Giao đến {ROOM_LABEL}</Text>
                <Text style={styles.summaryShip}>
                    Phí ship: {displayShipFee.toLocaleString('vi-VN')} đ (công thức {VARIANT.shipFormula})
                </Text>
            </View>

            <Text style={styles.totalAmountText}>
                Tổng hàng: {totalAmount.toLocaleString('vi-VN')} đ
            </Text>
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
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyText: {
        color: '#64748B',
        fontSize: 15,
    },
    listContent: {
        paddingTop: 12,
        paddingBottom: 8,
    },
    itemCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginBottom: 10,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    itemInfo: {
        flex: 1,
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1E3A8A',
        marginBottom: 6,
    },
    qtyPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyControl: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    qtySmallBtn: {
        width: 22,
        height: 22,
        backgroundColor: '#F1F5F9',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    qtySmallText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#334155',
        lineHeight: 14,
    },
    itemQty: {
        fontSize: 14,
        color: '#64748B',
        marginHorizontal: 6,
        fontWeight: '600',
    },
    itemPrice: {
        fontSize: 14,
        color: '#64748B',
        fontWeight: '500',
    },
    deleteBtn: {
        backgroundColor: '#DC2626',
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIcon: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    summaryBox: {
        marginHorizontal: 16,
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#F97316',
        backgroundColor: '#FFFFFF',
    },
    summaryRoom: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1E3A8A',
        marginBottom: 4,
    },
    summaryShip: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#EA580C',
    },
    totalAmountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1D4ED8',
        textAlign: 'center',
        marginVertical: 12,
    },
});

export default CartScreen;