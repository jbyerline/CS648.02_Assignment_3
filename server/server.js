const fs = require('fs');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');

const inventoryJSON = [
    {
        id: 1,
        productName: 'Jake Straight Stretch Jean',
        productPrice: 72.92,
        productCategory: 'Jeans',
        productImageUrl: 'https://www.buckle.com/bke-jake-straight-stretch-jean/prd-14410ABP16295/sku-1534153030',
    },
    {
        id: 2,
        productName: 'Cascade Hooded Sweatshirt\n',
        productPrice: 145.00,
        productCategory: 'Sweaters',
        productImageUrl: 'https://www.buckle.com/wanakome-cascade-hooded-sweatshirt/prd-27947601SPD/sku-4455950200',
    },
    {
        id: 3,
        productName: "Color Block Vest",
        productPrice: 59.95,
        productCategory: 'Jackets',
        productImageUrl: 'https://www.buckle.com/departwest-color-block-vest/prd-60946XRAY021/sku-7049630100',
    },
    {
        id: 4,
        productName: "GUESS Crystal Watch",
        productPrice: 200.00,
        productCategory: 'Accessories',
        productImageUrl: 'https://www.buckle.com/guess-crystal-watch/prd-81420U0799G2/sku-9423050000',
    },
    {
        id: 5,
        productName: "EIGHT X Printed Shirt",
        productPrice: 79.50,
        productCategory: 'Shirts',
        productImageUrl: 'https://www.buckle.com/eight-x-printed-shirt/prd-3303522244B22L/sku-4464380100',
    },
];

const resolvers = {
    Query: {
        productList,
    },
    Mutation: {
        addProduct,
    },
};

function productList() {
    return inventoryJSON;
}

function addProduct(_, {product}) {
    product.id = inventoryJSON.length + 1;
    inventoryJSON.push(product);
    return product;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
});

const app = express();
app.use(express.static('public'));


server.start().then(res => {
    server.applyMiddleware({app, path: '/graphql'});
    app.listen({port: 3000}, () =>
        console.log('Assignment 3 is running on http://localhost:3000' + server.graphqlPath)
    )
})
