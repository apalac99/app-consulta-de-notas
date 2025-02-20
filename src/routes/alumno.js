const express = require('express');
const router = express.Router();
const Alumno = require('../models/AlumnoB');

router.get('/:id', async (req, res) => {
  try {
    // Buscar por el campo `id` en lugar de `_id`
    const alumno = await Alumno.findOne({ id: req.params.id });
    if (!alumno) {
      return res.status(404).json({ msg: 'Alumno no encontrado' });
    }

    // Transformar los datos para que coincidan con lo que espera el frontend
    const alumnoTransformado = {
      nombre: `${alumno.primer_nombre} ${alumno.segundo_nombre || ''} ${alumno.apellido} ${alumno.segundo_apellido || ''}`.trim(),
      edad: calcularEdad(alumno.fecha_nacimiento), // Calcula la edad a partir de la fecha de nacimiento
      curso: alumno.grado,
      contacto: alumno.telefono_padre,
      materias: alumno.materias.map((materia) => ({
        nombre: materia.nombre,
        notas: materia.notas,
        anotaciones: materia.anotaciones,
      })),
      calificacion_disciplina: alumno.calificacion_disciplina,
      materias_extracurriculares: alumno.materias_extracurriculares,
    };

    res.json(alumnoTransformado);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// Función para calcular la edad a partir de la fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  const [dia, mes, anio] = fechaNacimiento.split('/').map(Number);
  const fechaNac = new Date(anio, mes - 1, dia);
  const diferencia = Date.now() - fechaNac.getTime();
  const edad = new Date(diferencia).getUTCFullYear() - 1970;
  return edad;
}

module.exports = router;