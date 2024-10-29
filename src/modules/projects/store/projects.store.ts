import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectos: [] as Proyectos[],
  }),
  actions: {
    agregarProyecto(nombreProyecto: string) {
      const proyecto = {
        id: Date.now().toString(),
        nombre: nombreProyecto,
        tareas: [],
        progreso: 0,
      };
      this.proyectos.push(proyecto);
    },
    
    agregarTarea(idProyecto: string, nombreTarea: string) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (!proyecto) return
      if (proyecto.tareas.length >= 10) throw new Error
      proyecto.tareas.push({
        id: Date.now().toString(),
        nombre: nombreTarea,
        completada: false,
        createdAt: Date.now(),
      });
    },
    
    editarTarea(idProyecto: string, idTarea: number, newName: string) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (!proyecto) return
      proyecto.tareas[idTarea].nombre = newName
    },

    eliminarTarea(idProyecto: string, idTarea: number) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (!proyecto) return
      proyecto.tareas.splice(idTarea, 1)
    },

    cambiarEstadoTarea(idProyecto: string, idTarea: number) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (!proyecto) return
      proyecto.tareas[idTarea].completada = !proyecto.tareas[idTarea].completada
      this.actualizarProgreso(idProyecto, idTarea)
    },

    actualizarProgreso(idProyecto: string, idTarea: number) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (!proyecto) return
      proyecto.tareas[idTarea].completada ? proyecto.progreso += 1 : proyecto.progreso -= 1
    },
  },
});
