'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    place: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "場所名は必須項目です。"
        }
      }
    },
    prefectures: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "都道府県は必須項目です。"
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER, 
      validate: {
        notEmpty: {
          msg: "ユーザIDは必須項目です。"
        }
      }

    },
    comment: {
      type: DataTypes.STRING,
    }, 
    image_directory: {
      type: DataTypes.STRING,
    }, 
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.User);
  };
  return Comment;
};
