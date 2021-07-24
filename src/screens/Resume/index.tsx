import React, { useCallback, useEffect, useState } from 'react';
import { HistoryCard } from '../../Components/HistoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DataListProps } from '../Dashboard';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    Moth,
    MothSelect,
    MothSelectButton,
    MothSelectIcon,
    Loading,
} from './styles';
import { useAuth } from '../../hooks/Auth';

interface CategoryData {
    key: string;
    name: string,
    total: string,
    totalUsedByCategory: number;
    color: string,
    percent: string,
}

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [totalbyCategories, setTotalbyCategory] = useState<CategoryData[]>([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const {user} = useAuth();   

    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            const newDate = addMonths(selectedDate, 1);
            setSelectedDate(newDate);
        } else {
            const newDate = subMonths(selectedDate, 1);
            setSelectedDate(newDate);
        }
    }

    async function loadData() {
        setIsLoading(true)
        const dataKey = `@gofinances:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        const responseformatted = response ? JSON.parse(response) : [];

        //filtrando somente oque é gasto
        const expensives = responseformatted
            .filter((expecive: DataListProps) =>
                expecive.type === 'negative' &&
                new Date(expecive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expecive.date).getFullYear() === selectedDate.getFullYear()
            );

        const expensivesTotal = expensives
            .reduce((acumullator: number, expensive: DataListProps) => {
                return acumullator + Number(expensive.amount)
            }, 0)

        const TotalbyCategory: CategoryData[] = [];
        //percorrendo as minhas categorias e gerando uma soma de gastos por categoria
        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: DataListProps) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })
            if (categorySum > 0) {
                const total = categorySum
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })
                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

                TotalbyCategory.push({
                    key: category.key,
                    name: category.name,
                    total,
                    totalUsedByCategory: categorySum,
                    color: category.color,
                    percent,
                })
            }
        })
        setTotalbyCategory(TotalbyCategory);
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => { loadData() }, [selectedDate]))

    return (
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>
            {isLoading ?
                <Loading>
                    <ActivityIndicator color={theme.colors.primary} size='large' />
                </Loading>
                :
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight(),
                    }}
                >
                    <MothSelect>
                        <MothSelectButton onPress={() => { handleDateChange('prev') }}>
                            <MothSelectIcon name='chevron-left' />
                        </MothSelectButton>
                        <Moth>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Moth>
                        <MothSelectButton onPress={() => { handleDateChange('next') }}>
                            <MothSelectIcon name='chevron-right' />
                        </MothSelectButton>
                    </MothSelect>


                    <ChartContainer>
                        <VictoryPie
                            data={totalbyCategories}
                            colorScale={totalbyCategories.map(item => item.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape,
                                }
                            }}
                            labelRadius={50}
                            x="percent"
                            y="totalUsedByCategory"
                        />
                    </ChartContainer>
                    {
                        totalbyCategories.map(item => (
                            <HistoryCard
                                key={item.key}
                                title={item.name}
                                amount={item.total}
                                color={item.color}
                            />
                        ))
                    }
                </Content>
            }
        </Container>
    )
}