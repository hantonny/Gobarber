import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    UserAvatar,
    ProviderListContainer,
    ProviderList,
    ProviderContainer,
    ProviderAvatar,
    ProviderName
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
interface RouteParams {
    providerId: string;
}

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}


const CreateAppointment: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const { goBack } = useNavigation();
    const routeParams = route.params as RouteParams;

    const [providers, setProvider] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

    useEffect(() => {
        api.get('providers').then((response) => {
            setProvider(response.data)
        })
    }, [])

    const navigateBack = useCallback(() => {
        goBack();
    }, [goBack])

    const handleSelectProvider = useCallback((providerId: string) => {
        setSelectedProvider(providerId);
    }, [])

    return (
        <Container >
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>
                <HeaderTitle>
                    Barbeiros
                </HeaderTitle>
                <UserAvatar source={{ uri: user.avatar_url }} />
            </Header>
            <ProviderListContainer>
                <ProviderList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={providers}
                    keyExtractor={provider => provider.id}
                    renderItem={({ item: provider }) => (
                        <ProviderContainer
                            onPress={() => handleSelectProvider(provider.id)}
                            selected={provider.id === selectedProvider}
                        >
                            <ProviderAvatar source={{ uri: provider.avatar_url }} />
                            <ProviderName
                                selected={provider.id === selectedProvider}
                            >{provider.name}</ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProviderListContainer>
        </Container >
    );
};

export default CreateAppointment;