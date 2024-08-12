const JwtUtils = require('../../src/utils/JwtUtils');
const jwt = require('jsonwebtoken');
const logger = require('../../src/utils/LoggerUtils');

jest.mock('jsonwebtoken');

describe('JwtUtilsTest', () => {
    const secretKey = process.env.PROJECT_GDB_SECRET_KEY
    const payload = { userId: 1 }
    const token = 'test_token'
    const mockVerify = (error, decoded) => {
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(error, decoded)
        })
    }

    beforeEach(() => {
        jest.clearAllMocks()
        jest.spyOn(logger, 'error').mockImplementation(() => { })
    })

    test('should verify a valid token', async () => {
        mockVerify(null, payload)

        const result = await JwtUtils.verifyToken(token)

        expect(result).toEqual(payload)
        expect(jwt.verify).toHaveBeenCalledWith(token, secretKey, expect.any(Function))
    })

    test('should throw an error for an invalid token', async () => {
        const errorMessage = 'invalid token'

        mockVerify(new Error(errorMessage), null)

        await expect(JwtUtils.verifyToken(token)).rejects.toThrow(errorMessage);
        expect(jwt.verify).toHaveBeenCalledWith(token, secretKey, expect.any(Function))
    })

    test('should throw an error for an expired token', async () => {
        const errorMessage = 'jwt expired';

        mockVerify(new Error(errorMessage), null)


        await expect(JwtUtils.verifyToken(token)).rejects.toThrow(errorMessage)
        expect(jwt.verify).toHaveBeenCalledWith(token, secretKey, expect.any(Function))
    })
})