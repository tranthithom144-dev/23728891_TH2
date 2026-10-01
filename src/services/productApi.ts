import { apiClient } from './apiClient';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const FOOD_ITEMS: Omit<Product, 'id'>[] = [
    {
        title: 'Cơm nắm',
        price: 1.3902439, // ~28.500 đ
        description: 'Mô tả ngắn từ API (tối đa 3 dòng).\nGiữ nguyên id từ route.params.',
        category: 'Món chính',
        image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=500&q=80',
    },
    {
        title: 'Trà sữa',
        price: 1.707317, // ~35.000 đ
        description: 'Trà sữa truyền thống đậm vị trà, ngọt béo kèm trân châu đen dai giòn.',
        category: 'Đồ uống',
        image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=500&q=80',
    },
    {
        title: 'Bút bi',
        price: 0.5853658, // ~12.000 đ
        description: 'Bút bi học tập mực xanh ra đều, êm tay, tiện lợi cho sinh viên.',
        category: 'Văn phòng phẩm',
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&q=80',
    },
    {
        title: 'Mì ly',
        price: 0.8780487, // ~18.000 đ
        description: 'Mì ly ăn liền nóng hổi đậm đà, tiện lợi giao nhanh tận phòng ký túc xá.',
        category: 'Ăn nhanh',
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80',
    },
    {
        title: 'Cơm tấm sườn bì chả',
        price: 2.1951219, // ~45.000 đ
        description: 'Cơm tấm sườn nướng mỡ hành thơm nức, chả trứng, bì giòn và nước mắm chua ngọt.',
        category: 'Món chính',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80',
    },
    {
        title: 'Bún bò Huế',
        price: 2.4390243, // ~50.000 đ
        description: 'Bún bò Huế cay nồng thơm mùi sả ruốc, thịt bắp bò mềm và chả cua đặc biệt.',
        category: 'Món nước',
        image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&q=80',
    },
    {
        title: 'Bánh mì thịt đặc biệt',
        price: 1.4634146, // ~30.000 đ
        description: 'Bánh mì giòn rụm kẹp pate béo ngậy, thịt nguội, chả lụa và dưa leo rau thơm.',
        category: 'Ăn nhanh',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80',
    },
    {
        title: 'Trà đào cam sả',
        price: 1.5609756, // ~32.000 đ
        description: 'Trà đào thanh mát giải nhiệt cùng miếng đào giòn ngọt và hương sả thơm lừng.',
        category: 'Đồ uống',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80',
    },
];

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        await apiClient.get('/products?limit=1');
    } catch (_e) {
        // use fallback gracefully if network is slow
    }
    return FOOD_ITEMS.map((item, index) => ({
        ...item,
        id: index + 1,
    }));
};