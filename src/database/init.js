const { User, Deployment, Domain } = require('./models');

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