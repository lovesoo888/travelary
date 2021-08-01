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
        type: DataTypes.DATEONLY, //DataTypes.DATEONLY
        allowNull: true,
      },
      userStatus: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: '1',
      },
      thought: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'Write your own quotes!',
      },
      profileImg: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
        // defaultValue: '',
      },
      profileImgTitle: {
        type: DataTypes.TEXT,
        allowNull: true,
        //defaultValue: '',
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
