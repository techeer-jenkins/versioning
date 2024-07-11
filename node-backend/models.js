const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mysql://session_example:session_example@db:3306/session_db', {
  logging: false,
});

async function connectSequelize() {
  while (true) {
    try {
      await sequelize.authenticate();
      console.log('MySQL connected...');
      break;
    } catch (err) {
      console.log('MySQL connection error:', err);
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5초 후 재시도
    }
  }
}

const User = sequelize.define('User1', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const Todo = sequelize.define('Todo1', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

User.hasMany(Todo, { foreignKey: 'ownerId' });
Todo.belongsTo(User, { foreignKey: 'ownerId' });

module.exports = {
  sequelize,
  connectSequelize,
  User,
  Todo,
};
