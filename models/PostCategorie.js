module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {}, {
    timestamps: false, tableName: 'PostsCategories',
  });

  PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategorie,
      as: 'categorys',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategorie,
      as: 'posts',
    });
  };

  return PostCategorie;
};