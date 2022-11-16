import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthController Unit Tests', () => {
  let authController: AuthController;
  let spyService: AuthService;

  beforeAll(async () => {
    const APIServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        register: jest.fn(() => {}),
        login: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, APIServiceProvider],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    spyService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('calling register method', () => {
    const dto = new RegisterDto();
    expect(authController.register(dto)).not.toEqual(null);
  });

  it('calling register method', () => {
    const dto = new RegisterDto();
    authController.register(dto);
    expect(spyService.register).toHaveBeenCalled();
    expect(spyService.register).toHaveBeenCalledWith(dto);
  });

  it('calling login method', () => {
    const dto = new LoginDto();
    expect(authController.login(dto)).not.toEqual(null);
  });

  it('calling login method', () => {
    const dto = new LoginDto();
    authController.login(dto);
    expect(spyService.login).toHaveBeenCalled();
    expect(spyService.login).toHaveBeenCalledWith(dto);
  });
});
