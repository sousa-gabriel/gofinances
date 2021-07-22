import React, { useState } from "react";
import { Container, Header, Title, Form, Filds, TransactionTypes } from './styles';
import { InputForm } from "../../Components/Form/InputForm";
import uuid from 'react-native-uuid'
import { useForm } from "react-hook-form";
import { Button } from "../../Components/Form/Button";
import { TransactionTypeButtons } from "../../Components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../Components/Form/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Keyboard,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import { useNavigation } from "@react-navigation/core";

interface FormData {
    name: string;
    amount: string;
}
const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .required('Preço é obrigatório'),
})

export function Register() {
    const navigation = useNavigation();
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    async function handleRegister(form: FormData) {
        if(!transactionType){
            return Alert.alert('Selecione o tipo da transação');
        }
        if(category.key === 'category'){
            return Alert.alert('Selecione a categoria ');
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date(),
        }
        //Para usar o AsyncStorage, definimos uma chave e passamos um texto por isso JSON.stringfy
        try {
            const dataKey='@gofinances:transactions';

            const response = await AsyncStorage.getItem(dataKey);
            const responseCurrent = response ? JSON.parse(response) : [];

            const responseformatted = [
                ...responseCurrent,
                newTransaction
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(responseformatted))

            //resetando os dados dos hooks e do form
            reset();
            setCategory({ key: 'category', name: 'Categoria' });
            setTransactionType('');

            navigation.navigate('Listagem')

        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possivel salvar esta Trasação')
        }
    }

    function handleTransactionsTypeSelected(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleOpenModalCategorySelect() {
        setCategoryModalOpen(true)
    }
    function handleCloseModalCategorySelect() {
        setCategoryModalOpen(false)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>

                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Filds>
                        <InputForm
                            placeholder="Nome"
                            control={control}
                            name="name"
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            placeholder="Preço"
                            control={control}
                            name="amount"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>
                            <TransactionTypeButtons
                                title="Income"
                                type="up"
                                onPress={() => { handleTransactionsTypeSelected('positive') }}
                                isActive={transactionType === 'positive'}
                            />

                            <TransactionTypeButtons
                                title="Outcome"
                                type='down'
                                onPress={() => { handleTransactionsTypeSelected('negative') }}
                                isActive={transactionType === 'negative'}
                            />

                        </TransactionTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenModalCategorySelect}
                        />
                    </Filds>
                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategotry={setCategory}
                        closeSelectCategory={handleCloseModalCategorySelect}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}