import { faker } from '@faker-js/faker';
import { Product } from '../models/product.model';

export const generateOneProduct = (): Product => {
    return {
        "id": parseInt(faker.datatype.uuid()),
        "title": faker.commerce.productName(),
        "price": parseInt(faker.commerce.price()),
        "description": faker.commerce.productDescription(),
        "category": {
            "id": parseInt(faker.datatype.uuid()),
            "name": faker.commerce.department()
        },
        "images": [
            faker.image.imageUrl(),
            faker.image.imageUrl(),
            faker.image.imageUrl()
        ]
    }
}

export const generateProductList = (size: number = 10): Product[] => {
    let products: Product[] = [];

    for (let i = 0; i < size; i++) {
        products.push(generateOneProduct());
    }

    return [...products];
}