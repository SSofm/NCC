import { AuthCredentialDto } from './dto/auth.credential.dto';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';


export const mockAccountService = () => ({
  createUser: jest.fn((createAccountDto: AuthCredentialDto) => {
    return createAccountDto;
  }),
});

export const mockAccount = () => ({
    email: "linh.nguyenthi@ncc.asia",
    password: "$2a$10$I8l4e/2g3dO5XRb2AcI5U.yjWnsCIl8mlfIDS6pIz8CevFwncAdiG",
    isAdmin: false,
    isProjectManager: false,
    lastLoginAt: null,
    id: "5eef94e5-1712-4dbe-b44e-450db0bea911",
    created_at: "2022-09-09T06:19:44.000Z"
});
