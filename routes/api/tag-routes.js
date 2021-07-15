const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll( {
  // be sure to include its associated Product data
      include: [
        {
          model: Product,
          model: ProductTag
        }
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`SELECT COUNT(*) FROM category AND product = id`),
            'product',
          ],
        ],
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
  // be sure to include its associated Product data
      include: [
        {
          model: Tag,
          model: ProductTag
        }
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`SELECT COUNT(*) FROM category AND product = id`),
            'product',
          ],
        ],
      },
    });
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.tagIds.length) {
        const tagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return Tag.bulkCreate(tagIdArr);
      }
      res.status(200).json(tag);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.put( {
      product_id: req.body.product_id
    });
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy( {
      where: { id: req.params.id }
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'There is no Tag using this id.' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;