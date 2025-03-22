const getBillingInfo = async (req, res) => {
    // Fetch billing information from the database
    res.json({ plan: 'Pro', dueDate: '2023-12-01' });
};

module.exports = { getBillingInfo };