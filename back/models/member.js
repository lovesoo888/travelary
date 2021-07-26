module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'member',
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      userpwd: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
