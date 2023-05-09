const { ApolloClient, createHttpLink, InMemoryCache } = require("@apollo/client");
import { setContext } from 'apollo-link-context'

const HttpLink = createHttpLink({
    uri: "http://localhost:4000/",
    fetch
});

const authLink = setContext( (_, { headers }) => {

    // read localstorage
    const token = localStorage.getItem('token');

    return {
        headers: { 
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(HttpLink)
});

export default client;

