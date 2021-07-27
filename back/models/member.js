module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'member',
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      userPwd: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      userStatus: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: '1',
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
