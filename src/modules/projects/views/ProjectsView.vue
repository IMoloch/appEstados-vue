<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proyecto, i) in proyectosStore.proyectos" :key="i" class="hover">
         <th> {{ i + 1 }}</th>
         <td>
          {{ proyecto.nombre }}</td>
         <td>
          {{ proyecto.tareas.length }}
        </td>
         <td><progress :value="proyecto.tareas.length ? proyecto.progreso*100/proyecto.tareas.length : 0" class="progress progress-primary w-56"  max="100"></progress></td>
        </tr>
      </tbody>
    </table>
  </div>

  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="onNewValue"
    placeholder="Ingrese el nombre del proyecto"
    title="Nuevo proyecto"
    sub-title="Dale un nombre único a tu proyecto"
  />

  <fab-button @click="modalOpen = true">
    <AddCircle />
  </fab-button>
</template>

<script lang="ts" setup>
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import { ref } from 'vue';

const modalOpen = ref(false);

import { useProyectosStore } from '../store/projects.store';
const proyectosStore = useProyectosStore();

const onNewValue = (nombreProyecto: string) => {
  proyectosStore.agregarProyecto(nombreProyecto);
  modalOpen.value = false; // Cierra el modal despues de agregar un nuevo proyecto
}

</script>
