const { User, Deployment, Domain } = require('./models');
const db = require('./models');

const initDatabase = async () => {
    try {
        await User.createTable();
        await Deployment.createTable();
        await Domain.createTable();
        console.log('Database tables initialized successfully.');
    } catch (err) {
        console.error('Error initializing database tables:', err.message);
    }
};

initDatabase();




const initializeDatabase = async () => {
    try {
        await db.sequelize.sync({ force: process.env.NODE_ENV === 'development' });
        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
};

module.exports = initializeDatabase;