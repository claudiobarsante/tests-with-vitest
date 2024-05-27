/* eslint-disable @typescript-eslint/unbound-method */
import { factory, manyOf, oneOf, primaryKey } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
	category: {
		id: primaryKey(faker.number.int),
		name: faker.commerce.department,
		products: manyOf('product'), //-- relation with product, each category has many products
	},
	product: {
		id: primaryKey(faker.number.int),
		name: faker.commerce.productName,
		price: () => faker.number.int({ min: 1, max: 100 }),
		categoryId: faker.number.int,
		category: oneOf('category'), //-- relation with category, each product belongs to a category
	},
});

export const getProductsByCategory = (categoryId: number) =>
	db.product.findMany({
		where: {
			categoryId: { equals: categoryId },
		},
	});
