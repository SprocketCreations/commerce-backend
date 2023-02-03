const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const all = await Tag.findAll({
			include: [Product],
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

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	try {
		const one = await Tag.findOne({
			where: { id: req.params.id },
			include: [Product],
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

router.post('/', async (req, res) => {
	// create a new tag
	try {
		const tag = await Tag.create(req.body);
		return res.status(200).json(tag);
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const response = await Tag.update(req.body, {
			where: { id: req.params.id }
		});
		return res.status(200).json(response[0]);
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const response = await Tag.destroy({
			where: { id: req.params.id }
		});
		if (response != 0) {
			return res.status(200).json(response);
		}
		return res.status(404).send();
	} catch (error) {
		console.log(error);
		return res.status(500).send();
	}
});

module.exports = router;
