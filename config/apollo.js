const { ApolloClient, HttpLink, InMemoryCache } = require("@apollo/client");

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000/",
        fetch
    })
});

export default client;

