module.exports = (sequelize, Sequelize) => {
    const Goal = sequelize.define("goal", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.INTEGER
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Goal;
  };