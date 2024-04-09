const { DataTypes } = require('sequelize');
const { sequelize } = require('../connection/db')

const Section = sequelize.define('Section', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'public'),
      defaultValue: 'draft'
    }
}, {freezeTableName: true});

const Topic = sequelize.define('Topic', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
});


const QuestionAnswer = sequelize.define('QuestionAnswer', {
    questionText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'public'),
      defaultValue: 'draft'
    }
});


Section.hasMany(Topic);
Topic.belongsTo(Section);

Topic.hasMany(QuestionAnswer);
QuestionAnswer.belongsTo(Topic)

sequelize.sync({force: false})
  .then(() => {
    console.log('Models Synced Successfuly');
  })
  .catch((error)=>{
    console.log("Error On Sync Models" , error);
  })

module.exports = {
    Section,
    Topic,
    QuestionAnswer
}
