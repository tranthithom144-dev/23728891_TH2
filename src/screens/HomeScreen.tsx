import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/productApi';
import { STUDENT, DEBOUNCE_MS, STALE_TIME_MS, ROOM_LABEL, VARIANT } from '../constants/student';
import { COLORS } from '../constants/theme';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { ProductCard } from '../components/ProductCard';
import { Watermark } from '../components/Watermark';

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
            <SafeAreaView style={styles.container}>
                <Watermark />
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#1D4ED8" />
                    <Text style={styles.loadingText}>Đang tải món...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (isError) {
        return (
            <SafeAreaView style={styles.container}>
                <Watermark />
                <View style={styles.centerContainer}>
                    <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                    <Text style={styles.errorText}>{'Không tải được\ndữ liệu món.'}</Text>
                    <TouchableOpacity style={styles.retryButton} activeOpacity={0.8} onPress={() => refetch()}>
                        <Text style={styles.retryText}>Thử lại</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Watermark />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>KTXGO</Text>
                <Text style={styles.headerSubtitle}>Giao tận {ROOM_LABEL}</Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                    placeholderTextColor="#64748B"
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
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerSubtitle: {
        fontSize: 13,
        color: '#DBEAFE',
        marginTop: 2,
    },
    searchContainer: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        borderColor: '#BFDBFE',
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 14,
        height: 42,
        fontSize: 14,
        color: '#1E3A8A',
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    loadingText: {
        marginTop: 14,
        color: '#1E3A8A',
        fontSize: 15,
        fontWeight: '500',
    },
    errorMssv: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#DC2626',
        marginBottom: 6,
    },
    errorText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1E3A8A',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#DC2626',
        paddingHorizontal: 48,
        paddingVertical: 12,
        borderRadius: 10,
    },
    retryText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});

export default HomeScreen;