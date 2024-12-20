import { Table, Column, Model, DataType, Index } from 'sequelize-typescript';

export interface AlumnosAttributes {
    id?: number;
    identidad: string; //matricula, cedula identidad, CURP, otro
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: Date;
    genero: string;
    estatus: boolean;
  }
@Table({ tableName: 'alumnos', timestamps: false })
export class Alumno
extends Model<AlumnosAttributes, AlumnosAttributes> 
implements AlumnosAttributes
{
    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
    @Index({ name: 'PRIMARY', using: 'BTREE', order: 'ASC', unique: true })
    id?: number;

    @Column({ type: DataType.STRING(50) })
    identidad!: string; //matricula, cedula identidad, CURP, otro

    @Column({ type: DataType.STRING(250) })
    nombre: string;
    
    @Column({ type: DataType.STRING(250) })
    apellidoPaterno: string;
    
    @Column({ type: DataType.STRING(250) })
    apellidoMaterno: string;

    @Column({ type: DataType.DATE })
    fechaNacimiento: Date;

    @Column({ type: DataType.STRING(25) })
    genero: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: '1' })
    estatus: boolean;
}