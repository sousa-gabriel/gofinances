import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';
import { Button } from '../../Components/Form/Button';
import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from './styles';

interface Category {
    key: string;
    name: string;
}
interface Props {
    category: Category;
    setCategotry: (name: Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategotry, closeSelectCategory }: Props) {
    function handleCategorySelect(category: Category) {
        setCategotry(category)
    }
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <FlatList
                data={categories}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (
                    <Category 
                        onPress={() => handleCategorySelect(item)} 
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon} />
                        <Name>{item.name}</Name>
                    </Category>
                )}
            />
            <Footer>
                <Button title="Selecionar" onPress={closeSelectCategory} />
            </Footer>
        </Container>
    )
}