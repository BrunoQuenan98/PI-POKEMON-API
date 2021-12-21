const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida:{
      type:DataTypes.STRING
    },
    fuerza:{
      type:DataTypes.STRING
    },
    defensa:{
      type:DataTypes.STRING
    },
    velocidad:{
      type:DataTypes.STRING
    },
    altura:{
      type:DataTypes.STRING
    },
    peso:{
      type:DataTypes.STRING
    },
    img:{
      type:DataTypes.STRING,
      defaultValue:'https://cdn-icons-png.flaticon.com/512/634/634741.png'
    }
  });
};

