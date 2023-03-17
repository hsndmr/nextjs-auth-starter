import Client from '@/api/client';
import { UserService } from '@/api/services/userService';

const client = new Client('/api');
const userService = new UserService(client);

export { client, userService };
