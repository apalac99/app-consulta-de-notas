const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  id: String,
  primer_nombre: String,
  segundo_nombre: String,
  apellido: String,
  segundo_apellido: String,
  padre: String,
  madre: String,
  telefono_padre: String,
  telefono_madre: String,
  fecha_nacimiento: String,
  grado: String,
  materias: [
    {
      nombre: String,
      notas: [Number],
      anotaciones: [
        {
          fecha: String,
          comentario: String,
        },
      ],
    },
  ],
  calificacion_disciplina: {
    calificacion: String,
    anotaciones: String,
  },
  anos_en_colegio: Number,
  materias_extracurriculares: [String],
  pagos_al_dia: Boolean,
});

const Alumno = mongoose.model('Alumno', alumnoSchema, 'demo'); // Asegúrate de que la colección sea 'demo'

module.exports = Alumno;