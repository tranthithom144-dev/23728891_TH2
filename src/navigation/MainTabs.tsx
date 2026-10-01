import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { CartScreen } from '../screens/CartScreen';
import { MeScreen } from '../screens/MeScreen';
import { useCartStore } from '../stores/cartStore';
import { COLORS } from '../constants/theme';
import { VARIANT } from '../constants/student';

const Tab = createBottomTabNavigator();

export const MainTabs = () => {
    const cart = useCartStore((state) => state.cart);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const shopTab = (
        <Tab.Screen
            key="ShopTab"
            name="ShopTab"
            component={ShopStack}
            options={{ tabBarLabel: 'Cửa hàng' }}
        />
    );

    const cartTab = (
        <Tab.Screen
            key="CartTab"
            name="CartTab"
            component={CartScreen}
            options={{
                tabBarLabel: 'Giỏ',
                tabBarBadge: totalItems > 0 ? totalItems : undefined,
            }}
        />
    );

    const meTab = (
        <Tab.Screen
            key="MeTab"
            name="MeTab"
            component={MeScreen}
            options={{ tabBarLabel: 'Tôi' }}
        />
    );

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1D4ED8',
                tabBarInactiveTintColor: '#64748B',
                tabBarBadgeStyle: {
                    backgroundColor: '#EA580C',
                    color: '#FFFFFF',
                    fontSize: 10,
                    fontWeight: 'bold',
                },
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopColor: '#E2E8F0',
                    borderTopWidth: 1,
                    height: 52,
                    paddingBottom: 6,
                    paddingTop: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}>
            {VARIANT.tabOrder === 'cartFirst' ? [cartTab, shopTab, meTab] : [shopTab, cartTab, meTab]}
        </Tab.Navigator>
    );
};