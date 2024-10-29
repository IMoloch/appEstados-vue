export {};

declare global{
  interface Proyectos {
    id: string;
    nombre: string;
    tareas: Tareas[];
    progreso: number;
  }
  
  interface Tareas {
    id: string;
    nombre: string;
    completada: boolean;
    createdAt: number;
  }
}