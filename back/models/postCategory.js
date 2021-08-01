module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      categoryName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      // categoryCode: {
      //   type: DataTypes.STRING(45),
      //   allowNull: false,
      // },
      // travelStart: {
      //   type: DataTypes.TIMESTAMP,
      //   allowNull: false,
      // },
      // travelEnd: {
      //   type: DataTypes.TIMESTAMP,
      //   allowNull: false,
      // },
      thumbnail: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: true,
      paranoid: true,
    }
  );
  PostCategory.associate = (db) => {
    // db.PostCategory.belongsTo(db.Attachment);
    // db.PostCategory.belongsTo(db.Member);
    db.PostCategory.hasMany(db.Post);
  };
  return PostCategory;
};
