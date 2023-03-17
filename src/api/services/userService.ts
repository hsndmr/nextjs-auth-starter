import { BaseService } from '@/api/services/baseService';
import { User } from '@/api/models/userModel';
import { LoginProps, RegisterProps } from '@/api/interfaces/userServiceTypes';

export class UserService extends BaseService {
  getUser() {
    return this.client.get('/auth/user');
  }

  login(props: LoginProps): Promise<User> {
    return this.client
      .post<{
        token: string;
        user: User;
      }>('/auth/login', props)
      .then((res) => res.data.user);
  }

  register(props: RegisterProps): Promise<User> {
    return this.client
      .post<{
        token: string;
        user: User;
      }>('/auth/register', props)
      .then((res) => res.data.user);
  }

  logout() {
    return this.client.post('/auth/logout');
  }
}
