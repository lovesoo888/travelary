module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      categoryName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      categoryCode: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      travelStart: {
        type: DataTypes.DATETIME,
        allowNull: false,
      },
      travelEnd: {
        type: DataTypes.DATETIME,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  PostCategory.associate = (db) => {
    db.PostCategory.belongsTo(db.Attachments);
    db.PostCategory.belongsTo(db.Member);
  };
};
