'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "ユーザーネームは必須項目です。"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "メールアドレスは必須項目です。"
        }, 
        isEmail: {
          msg: "有効なメールアドレスを入力してください。"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "パスワードは必須項目です。"
        }, 
      }
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Comment);
  };
  return User;
};
