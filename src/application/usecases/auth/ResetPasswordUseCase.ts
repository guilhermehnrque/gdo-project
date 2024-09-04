import { UserService } from '../../services/UserService';
import { JwtService } from '../../services/JwtService';
import { UserEntity } from '../../../domain/entity/UserEntity';

export class ResetPasswordUseCase {

    private userService: UserService;
    private jwtService: JwtService;

    constructor() {
        this.userService = new UserService();
        this.jwtService = new JwtService();
    }

    async execute(email: string, password: string, token: string): Promise<void> {
        const user = await this.stepValidateIfUserExistsAndReturn(token);

        await user.hashNewPassword(password);
        user.cleanTokens();

        await this.userService.updateUser(user);

        await this.jwtService.expireLatestToken(user!.id);
    }

    private async stepValidateIfUserExistsAndReturn(userToken: string): Promise<UserEntity> {
        return await this.userService.getUserByResetToken(userToken);
    }

}