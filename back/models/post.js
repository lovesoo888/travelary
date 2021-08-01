module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: true,
      paranoid: true,
    }
  );
  Post.associate = (db) => {
    db.Post.hasMany(db.Attachment);
    db.Post.hasMany(db.Comment);
    // db.Post.belongsTo(db.Member);
    db.Post.belongsTo(db.PostCategory);
  };
  return Post;
};
