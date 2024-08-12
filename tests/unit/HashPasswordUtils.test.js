const bcrypt = require('bcrypt');
const HashPassword = require('../../src/utils/HashPasswordUtils');

jest.mock('bcrypt');

describe('HashPassword', () => {
    const password = 'test_password'
    const hash = 'test_hash'
    const saltRounds = '10'
    const secretKey = 'secret_key'

    beforeAll(() => {
        process.env.PROJECT_GDB_SALT_ROUNDS = saltRounds;
        process.env.PROJECT_GDB_SECRET_KEY = secretKey;
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should hash password with salt rounds', async () => {
        bcrypt.hash.mockResolvedValue(hash);

        const result = await HashPassword.hashPassword(password);

        expect(result).toBe(hash);
    })

    test('should compare password with hash', async () => {
        bcrypt.compare.mockResolvedValue(true);

        const result = await HashPassword.comparePassword(password, hash);

        expect(result).toBe(true);
        expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    })

    test('should hash password with secret key', async () => {
        bcrypt.hash.mockResolvedValue(hash);

        const result = await HashPassword.hashPasswordWithSecretKey(password);

        expect(result).toBe(hash);
        expect(bcrypt.hash).toHaveBeenCalledWith(password, parseInt(secretKey));
    })

    test('should compare password with hash using secret key', async () => {
        bcrypt.compare.mockResolvedValue(true);

        const result = await HashPassword.comparePasswordWithSecretKey(password, hash);

        expect(result).toBe(true);
        expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });
})