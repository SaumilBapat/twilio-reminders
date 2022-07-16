module.exports = (sequelize, Sequelize) => {
    const Goal = sequelize.define("goal", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.DATE
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Goal;
  };