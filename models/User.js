import { Sequelize, DataTypes,  } from 'sequelize';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './usuarios.db'
  }); 
const User = sequelize.define('User', {
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  }, 
  username: {
    type:DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Esto asegura que no haya duplicados
    validate: {
      isEmail: true
    }
   },
  tasks:{
    type:DataTypes.STRING,
  },
  droppables:{
    type:DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
   uid:{
    type:DataTypes.TEXT,
    unique:true
   },
   photoURL:{ 
    type:DataTypes.TEXT
   }
 }
);
  
export default User; 