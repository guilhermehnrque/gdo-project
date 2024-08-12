const UserManagementRepository = require('../../../src/repositories/UserManagementRepository')
const UserModel = require('../../../src/models/user')
const sequelize = require('sequelize')

jest.mock('../../../src/models/user')
jest.mock('sequelize')

describe('UserManagementRepository', () => {
    let userManagementRepository;

    beforeEach(() => {
        userManagementRepository = new UserManagementRepository();
        UserModel.build.mockReset();
    });

    describe('createUser', () => {
        test('should create a user successfully', async () => {
            const userEntity = { login: 'testuser', password: 'password123' };
            const savedUser = { id: 1, ...userEntity };

            UserModel.build.mockReturnValue({
                save: jest.fn().mockResolvedValue(savedUser),
            });

            const result = await userManagementRepository.createUser(userEntity);

            expect(UserModel.build).toHaveBeenCalledWith(userEntity);
            expect(result).toEqual(savedUser);
        });

        test('should throw an error if user creation fails', async () => {
            const userEntity = { login: 'testuser', password: 'password123' };
            const errorMessage = 'Failed to create user';

            UserModel.build.mockReturnValue({
                save: jest.fn().mockRejectedValue(new Error(errorMessage))
            });

            await expect(userManagementRepository.createUser(userEntity)).rejects.toThrow(errorMessage);
            expect(UserModel.build).toHaveBeenCalledWith(userEntity);
        });
    });
});