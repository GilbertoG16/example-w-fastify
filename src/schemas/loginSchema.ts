export const loginSchema = {
    body: {
        type: 'object',
        properties: {
            username: { type: 'string', minLength: 3 },
            password: { type: 'string', minLength: 6 }
        },
        required: ['username', 'password'],
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' },
                msg: { type: 'string' }
            }
        },
        401: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};
