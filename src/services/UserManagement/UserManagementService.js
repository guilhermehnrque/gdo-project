const UserManagementRepository = require('../../repositories/UserManagementRepository');
const RegisterUserDTO = require('./dto/RegisterUserDTO');
const UserEntity = require('../../entity/UserEntity');
const InvalidCredentialsError = require('../../erros/InvalidCredentialsError');
const UserAlreadyExistsError = require('../../erros/UserAlreadyExistsError');
const Jwt = require('../../utils/JwtUtils');
const HashPassword = require('../../utils/HashPasswordUtils');
const logger = require('../../utils/LoggerUtils');

class UserManagementService {
    
    constructor() {
        this.userManagementRepository = new UserManagementRepository();
    }

    async createUser(payload) {
        const registerUserDTO = RegisterUserDTO.fromRequest(payload);
        const existingUser = await this.userManagementRepository.getUserByLogin(registerUserDTO.getLogin());

        if (existingUser) {
            this.logAndThrow(new UserAlreadyExistsError('Usuário já registrado no sistema.'), registerUserDTO.getLogin());
        }

        const userEntity = await UserEntity.fromDTO(registerUserDTO);
        return await this.userManagementRepository.createUser(userEntity);
    }

    async loginUser({ login, password }) {
        const user = await this.userManagementRepository.getUserByLogin(login);
        this.validateUserLogin(user, login);

        const isValidPassword = await HashPassword.comparePassword(password, user.password);
        if (!isValidPassword) {
            this.logAndThrow(new InvalidCredentialsError('Usuário ou senha inválidos.'), login);
        }

        return Jwt.generateToken(user.toJSON());
    }

    validateUserLogin(user, login) {
        if (!user) {
            this.logAndThrow(new InvalidCredentialsError('Usuário ou senha inválidos.'), login);
        }
    }

    logAndThrow(error, context) {
        logger.error(`[${error.name}] ${error.message} -> ${context}`);
        throw error;
    }
}

module.exports = UserManagementService;
