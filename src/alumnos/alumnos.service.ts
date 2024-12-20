import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Alumno } from './alumno.model';
import sequelize from 'sequelize';

@Injectable()
export class AlumnosService {
  constructor(
    @InjectModel(Alumno)
    private readonly alumnoModel: typeof Alumno,
  ) {}

  async getAll() {
    //const alumno = new Alumno(alumnoData);
    var query = 'CALL sp_selectAlumnos()';
    const [alumnosRes, dataRes] = await Alumno.sequelize.query(query, {
      replacements: {},
      type: sequelize.QueryTypes.SELECT,
    });
    return { alumnos: { ...alumnosRes } };
  }

  async create(alumnoData) {
    var query =
      'CALL sp_insertAlumno(:identidad, :nombre, :apellidoPaterno, :apellidoMaterno, :fechaNacimiento, :genero)';
    const alumno = new Alumno(alumnoData);
    const [alumnosRes, dataRes] = await Alumno.sequelize.query(query, {
      replacements: {
        identidad: alumno.identidad,
        nombre: alumno.nombre,
        apellidoPaterno: alumno.apellidoPaterno,
        apellidoMaterno: alumno.apellidoMaterno,
        fechaNacimiento: alumno.fechaNacimiento,
        genero: alumno.genero,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    alumno.id = alumnosRes[0].id;
    return alumno;
  }

  async update(id, alumnoData) {
    var query =
      'CALL sp_updateAlumno(:id, :identidad, :nombre, :apellidoPaterno, :apellidoMaterno, :fechaNacimiento, :genero)';
    const alumno = new Alumno(alumnoData);
    const [alumnosRes, dataRes] = await Alumno.sequelize.query(query, {
      replacements: {
        id: id,
        identidad: alumno.identidad,
        nombre: alumno.nombre,
        apellidoPaterno: alumno.apellidoPaterno,
        apellidoMaterno: alumno.apellidoMaterno,
        fechaNacimiento: alumno.fechaNacimiento,
        genero: alumno.genero,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    return alumno;
  }
}
