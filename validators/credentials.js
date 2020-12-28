module.exports = {
    user: {
        presence: true,
        type: 'string',
        length: { minimum: 1 },
    },
    password: {
        presence: true,
        type: 'string',
        length: { minimum: 1 },
    },
    host: {
        presence: true,
        type: 'string',
        length: { minimum: 1 },
    },
    database: {
        presence: true,
        type: 'string',
        length: { minimum: 1 },
    },
    port: {
        presence: true,
        numericality: {
            greaterThan: 0,
            lessThan: 1 << 16,
        },
    },
};

