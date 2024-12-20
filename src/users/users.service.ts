import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import sequelize from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(userData) {
    var query = 'CALL sp_insertUser(:nombre, :email, :password)';
    const user = new User(userData);
    const [usersRes, dataRes] = await User.sequelize.query(query, {
      replacements: {
        nombre: user.nombre,
        email: user.email,
        password: user.password,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    user.id = usersRes[0].id;
    return user;
  }

  async findOneByEmail(email) {
    var query = 'CALL sp_selectUserByEmail(:email)';
    const [usersRes, dataRes] = await User.sequelize.query(query, {
      replacements: {
        email: email,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    if (Object.keys(usersRes).length === 0) {
      return null;
    }
    var userObj = new User(usersRes[0]);
    return userObj;
  }
}
