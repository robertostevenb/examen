import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';

export interface UsersAttributes {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    estatus: boolean;
  }
@Table({ tableName: 'users', timestamps: false })
export class User
extends Model<UsersAttributes, UsersAttributes> 
implements UsersAttributes
{
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    id?: number;
    
    @Column({ type: DataType.STRING(250) })
    nombre: string;
    
    @Column({ type: DataType.STRING(150) })
    email: string;

    @Column({ type: DataType.STRING(500) })
    password: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: '1' })
    estatus: boolean;
}