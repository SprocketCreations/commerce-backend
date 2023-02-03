const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const all = await Category.findAll();
		if (all) {
			return res.status(200).json(all);
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const one = await Category.findOne({ where: { id: req.params.id, }, });
		if (one) {
			return res.status(200).json(one);
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

router.post('/', async (req, res) => {
	// create a new category
	try {
		const response = await Category.create({
			name: req.body.name,
		});
		if (response) {
			return res.status(201).json(response);
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	try {
		const response = await Category.update(
			{
				name: req.body.name,
			},
			{ where: { id: req.params.id } });
		if (response) {
			return res.status(200).json(response);
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	try {
		const response = await Category.destroy(
			{ where: { id: req.params.id } });
		if (response) {
			return res.status(200).json(response);
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

module.exports = router;
