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
      type:DataTypes.DOUBLE
    },
    fuerza:{
      type:DataTypes.DOUBLE
    },
    defensa:{
      type:DataTypes.DOUBLE
    },
    velocidad:{
      type:DataTypes.DOUBLE
    },
    altura:{
      type:DataTypes.DOUBLE
    },
    peso:{
      type:DataTypes.DOUBLE
    },
    img:{
      type:DataTypes.STRING
    }
  });
};

