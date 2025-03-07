import axios from 'axios';

const publicApiClient = axios.create({
    baseURL: 'http://localhost:4004',
});

const usePublicApiClient = () => {
    return publicApiClient;
};

export default usePublicApiClient;
