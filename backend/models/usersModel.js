const Sequelize = require('sequelize')
const db = require('../config/database')

module.exports = db.sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    family_name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    last_login_date: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    update_at: {
      type: Sequelize.DATE,
      defaultValue: null
    },
    
  },
  {
    timestamps: false
  }
)
