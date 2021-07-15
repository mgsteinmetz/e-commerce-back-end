const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll( {
  // be sure to include its associated Products
      include: [
        { 
          model: Category,
          model: Product 
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
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(200).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const oneCategory = await Category.findByPk(req.params.id, { 
  // be sure to include its associated Products
      include: [
        { 
          model: Category,
          model: Product 
        }
      ],
      attributes: {
        include: [
          [
            sequelize.literal(`SELECT COUNT(*) FROM category AND product = id`),
            'theSuperShortBooks',
          ],
        ],
      },
    });
    if (!oneCategory) { 
      res.status(404).json({ message: 'No Catergory found using this id.' });
      return;
    };
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      if (req.body.tagIds.length) {
        const categoryIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return Category.bulkCreate(categoryIdArr);
      }
      res.status(200).json(category);
    })
    .then((categoryIds) => res.status(200).json(categoryIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.put( {
      product_id: req.body.product_id
    });
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy( {
      where: { id: req.params.id }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'There is no Category using this id.' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;