const JwtUtils = require('../../src/utils/JwtUtils');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('JwtUtils', () => {
    const secretKey = process.env.PROJECT_GDB_SECRET_KEY
    const payload = { userId: 1 }
    const token = 'test_token'

    beforeAll(() => {
        process.env.PROJECT_GDB_SECRET_KEY = secretKey; 
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should verify a valid token', async () => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            if (secret == secretKey){
                callback(null, payload);
            }
        })

        const result = await JwtUtils.verifyToken(token)
        
        expect(result).toEqual(payload)
        expect(jwt.verify).toHaveBeenCalledWith(token, secretKey, expect.any(Function))
    })

    test('should throw an error for an invalid token', async () => {
        const errorMessage = 'invalid token'
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(new Error(errorMessage), null)
        });

        await expect(JwtUtils.verifyToken(token)).rejects.toThrow(errorMessage);
        expect(jwt.verify).toHaveBeenCalledWith(token, secretKey, expect.any(Function))
    })

    test('should throw an error for an expired token', async () => {
        const errorMessage = 'jwt expired';
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(new Error(errorMessage), null)
        });

        await expect(JwtUtils.verifyToken(token)).rejects.toThrow(errorMessage)
        expect(jwt.verify).toHaveBeenCalledWith(token, secretKey, expect.any(Function))
    })
})