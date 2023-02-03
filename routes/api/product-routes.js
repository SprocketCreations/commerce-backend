const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
	// find all products
	// be sure to include its associated Category and Tag data
	try {
		const all = await Product.findAll({
			include: [Category, Tag],
		});
		if (all) {
			return res.status(200).json(all);
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

// get one product
router.get('/:id', async (req, res) => {
	// find a single product by its `id`
	// be sure to include its associated Category and Tag data
	try {
		const one = await Product.findOne({
			where: { id: req.params.id },
			include: [Category, Tag],
		});
		if (one) {
			return res.status(200).json(one);
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

// create new product
router.post('/', async (req, res) => {
	/* req.body should look like this...
	  {
		name: "Basketball",
		price: 200.00,
		stock: 3,
		tagIds: [1, 2, 3, 4]
	  }
	*/
	try {
		const product = await Product.create(req.body);

		// if there's product tags, we need to create pairings to bulk create in the ProductTag model
		if (req.body.tagIds && req.body.tagIds.length) {
			const records = req.body.tagIds.map(tagId => ({ productId: product.id, tagId }));
			product.tags = await ProductTag.bulkCreate(records);
			res.status(201).json(product);
		}
		// if no product tags, just respond
		return res.status(201).json(product);
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

// update product
router.put('/:id', async (req, res) => {
	try {
		// update product data
		const product = await Product.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		// find all associated tags from ProductTag
		const productTags = await ProductTag.findAll({ where: { productId: req.params.id } });

		// get list of current tagIds
		const productTagIds = productTags.map(({ tagId }) => tagId);

		// create filtered list of new tagIdsF
		const newProductTags = req.body.tagIds
			// Remove tags from the user's submission that are already assigned to this product.
			.filter(tagId => !productTagIds.includes(tagId))
			// Make the bulk create array
			.map(tagId => ({ productId: req.params.id, tagId }));

		// figure out which ones to remove
		const productTagsToRemove = productTags
			// Remove tags from the product that are not in the user's submission.
			.filter(({ tagId }) => !req.body.tagIds.includes(tagId))
			// Make the destroy array of the ids
			.map(({ id }) => id);

		// run both actions.
		const updatedProductTags = await Promise.all([
			// Remove the tags that the user does not want anymore
			ProductTag.destroy({ where: { id: productTagsToRemove } }),
			// add all the new tags
			ProductTag.bulkCreate(newProductTags),
		]);
		return res.status(200).json(updatedProductTags);
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

router.delete('/:id', async (req, res) => {
	// delete one product by its `id` value
	try {
		const response = await Product.destroy({
			where: { id: req.params.id },
		});
		if (response) {
			return res.status(200).send();
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

module.exports = router;
