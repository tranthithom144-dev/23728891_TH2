import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@services/productApi';
import { STUDENT, DEBOUNCE_MS, STALE_TIME_MS, ROOM_LABEL, VARIANT } from '@constants/student';
import { COLORS } from '@constants/theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { ProductCard } from '@components/ProductCard';
import { Watermark } from '@components/Watermark';

export const HomeScreen = ({ navigation }: any) => {
    const [searchText, setSearchText] = useState('');
    const debouncedSearch = useDebouncedValue(searchText, DEBOUNCE_MS);

    const { data, isLoading, isError, refetch, isRefetching } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: STALE_TIME_MS,
    });

    const filteredData =
        data?.filter((item) =>
            item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
        ) || [];

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Đang tải món...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
                    <Text style={styles.retryText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.header}>
                <Text style={styles.headerTitle}>KTXGO</Text>
                <Text style={styles.headerSubtitle}>Giao tận {ROOM_LABEL}</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                    placeholderTextColor={COLORS.textLight}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <View style={styles.listContainer}>
                <FlashList
                    data={filteredData}
                    numColumns={2}
                    estimatedItemSize={180}
                    keyExtractor={(item) => `${STUDENT.mssv}-${item.id}`}
                    renderItem={({ item }) => (
                        <ProductCard
                            product={item}
                            onPress={() => navigation.navigate('Detail', { id: item.id.toString(), product: item })}
                        />
                    )}
                    refreshing={isRefetching}
                    onRefresh={refetch}
                />
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
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#DBEAFE',
    },
    searchContainer: {
        padding: 12,
    },
    searchInput: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
        color: COLORS.text,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 6,
    },
    centerContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    loadingText: {
        marginTop: 12,
        color: COLORS.text,
        fontSize: 14,
    },
    errorMssv: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.error,
        marginBottom: 4,
    },
    errorText: {
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: COLORS.error,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});