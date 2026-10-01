import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Haptics } from '../services/haptics';
import { Product } from '../services/productApi';
import { COLORS } from '../constants/theme';
import { PRICE_MULTIPLIER, VARIANT } from '../constants/student';
import { useCartStore } from '../stores/cartStore';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
}

const PASTEL_COLORS = ['#FEF3C7', '#DBEAFE', '#DCFCE7', '#FFE4E6', '#F3E8FF', '#FFEDD5'];

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const displayPrice =
        Math.round(product.price * PRICE_MULTIPLIER).toLocaleString('vi-VN') + ' đ';

    const handleAddToCart = () => {
        addToCart(product);
        if (VARIANT.hapticOnAdd === 'impact') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
            Haptics.selectionAsync();
        }
    };

    const bgColor = PASTEL_COLORS[(product.id - 1) % PASTEL_COLORS.length];

    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
            <View style={[styles.imageContainer, { backgroundColor: bgColor }]}>
                {product.image ? (
                    <Image style={styles.image} source={{ uri: product.image }} resizeMode="cover" />
                ) : (
                    <View style={styles.fallbackGraphic}>
                        <View style={styles.oval} />
                        <View style={styles.rectangle} />
                    </View>
                )}
            </View>
            <Text style={styles.title} numberOfLines={1}>
                {product.title}
            </Text>
            <View style={styles.bottomRow}>
                <Text style={styles.price}>{displayPrice}</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.7}
                    onPress={handleAddToCart}>
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 6,
        borderRadius: 16,
        padding: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1.5 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    imageContainer: {
        height: 105,
        borderRadius: 12,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
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
        width: '75%',
        height: '50%',
        borderRadius: 50,
        backgroundColor: '#93C5FD',
        position: 'absolute',
    },
    rectangle: {
        width: '55%',
        height: '24%',
        borderRadius: 4,
        backgroundColor: '#1D4ED8',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E3A8A',
        marginBottom: 4,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 2,
    },
    price: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#2563EB',
    },
    addButton: {
        backgroundColor: '#1D4ED8',
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 20,
    },
});