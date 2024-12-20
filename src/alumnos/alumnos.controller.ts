import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AlumnosService } from './alumnos.service';
import { Alumno } from './alumno.model';
import { AuthGuard } from '../auth/auth.guard';

@Controller('alumnos')
export class AlumnosController {
  constructor(private readonly alumnosService: AlumnosService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.alumnosService.getAll();
  }

  @Post('create')
  @UseGuards(AuthGuard)
  create(@Body() alumnoData) {
    return this.alumnosService.create(alumnoData);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() alumnoData) {
    return this.alumnosService.update(+id, alumnoData);
  }
}
