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
      res.status(404).json({ message: 'No Catergory found using this id' });
      return;
    };
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
router.post('/', (req, res) => {
  // create a new category

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
