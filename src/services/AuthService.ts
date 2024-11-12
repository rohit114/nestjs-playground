import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLogInDto } from 'src/dto/requests/UserDto';
import repoManager from 'src/managers/repo.manager';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    public async login(loginDto: UserLogInDto) {
        try {
            let payload = { email: loginDto.email, mobile: loginDto.mobile };
            let user = await repoManager.userRepo.findByEmailOrMobile(loginDto.email, loginDto.mobile);
            if (!user) {
                throw new NotFoundException(`User with email: ${loginDto.email} mobile: ${loginDto.mobile} not found`);
            }
            const userId = {userId: user.userId};
            const accessToken = this.jwtService.sign({...payload, ...userId}, { expiresIn: '24h' });
            await repoManager.userRepo.saveAccessToken(user.userId, accessToken);  // Save the access token to the user table
            return {
                access_token: accessToken,
            };
        } catch (error) {
            console.error("user login Err", error.message)
            throw new BadRequestException('User login failed')
        }

    }
}
