module.exports = (sequelize, Sequelize) => 
{
    const Phone = sequelize.define("phone", 
	{
        id: 
		{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        number: 
		{
            type: Sequelize.STRING,  // Storing phone numbers as strings
            allowNull: false
        },
        type: 
		{
            type: Sequelize.STRING,  // Represents phone type, e.g., 'mobile', 'home', etc.
            allowNull: false
        },
        name: 
		{
            type: Sequelize.STRING,
            allowNull: false
        },
        contactId: 
		{
            type: Sequelize.INTEGER,
            references: {
                model: 'contacts',
                key: 'id'
            }
        }
    });
  
    return Phone;
};


