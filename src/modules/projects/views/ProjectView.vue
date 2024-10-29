<template>
  <div class="p-8 overflow-x-auto w-full">
    <h2>Nombre Proyecto: {{ proyectoActual?.nombre }}</h2>

    <div class="mt-4">
      <input
        v-model="nuevaTarea"
        type="text"
        placeholder="Agregar nueva tarea"
        class="input input-borderd mr-2"
        @keypress.enter="agregarTarea"
      />
      <button @click="agregarTarea"  class="btn btn-primary">Agregar</button>
    </div>
    <ErrorMsg message="Límite de Tareas Alcanzado" :errorStatus="errorStatus" class="my-3" />

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Completada</th>
          <th>Tarea</th>
          <th>Fecha y hora de Registro</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tarea, index) in proyectoActual?.tareas" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <input type="checkbox" :checked="tarea.completada" @click="cambiarEstadoTarea(index)" />
          </td>
          <td>{{ tarea.nombre }}</td>
          <td>
            {{ formattedDate(tarea.createdAt) }}
          </td>
          <td>
            <button class="btn btn-info size-fit" @click="openModal(index, tarea.nombre)">
              <EditIcon class="size-7" />
            </button>
            <button class="btn btn-error size-fit ml-1" @click="eliminarTarea(index)">
              <DeleteIcon class="size-7" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="onNewValue"
    placeholder="Ingrese el nombre de la tarea"
    title="Editar Tarea"
    :previousValue="oldName"
  />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProyectosStore } from '../store/projects.store';
import ErrorMsg from '@/modules/common/components/ErrorMsg.vue';
import EditIcon from '@/modules/common/icons/EditIcon.vue';
import DeleteIcon from '@/modules/common/icons/DeleteIcon.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
const proyectosStore = useProyectosStore();

const route = useRoute();
const nuevaTarea = ref('');
const errorStatus = ref(false);
const modalOpen = ref(false);
const tareaSeleccionada = ref()
const oldName = ref('')

const proyectoActual = computed(
  () =>
    proyectosStore.proyectos.find((proyecto) => proyecto.id === route.params.id) ?? {
      id: '',
      nombre: '',
      tareas: [],
      progreso: 0,
    },
);

const agregarTarea = () => {
  if (nuevaTarea.value.trim() !== '') {
    try {
      proyectosStore.agregarTarea(route.params.id as string, nuevaTarea.value.trim());
      nuevaTarea.value = '';
    } catch (error) {
      errorStatus.value = true;
      setTimeout(() => {
        errorStatus.value = false
      }, 5000);
    }
  }
};

const cambiarEstadoTarea = (idTarea: number) => {
  proyectosStore.cambiarEstadoTarea(proyectoActual.value.id, idTarea);
};

const eliminarTarea = (idTarea: number) => {
  proyectosStore.eliminarTarea(proyectoActual.value.id, idTarea);
}

const formattedDate = (date: string) => {
  return new Date(date).toLocaleString();
};

const onNewValue = (nombreTarea: string) => {
  proyectosStore.editarTarea(proyectoActual.value.id, tareaSeleccionada.value, nombreTarea);
  modalOpen.value = false;
}

const openModal = (idTarea: number, nameTarea: string) => {
  tareaSeleccionada.value = idTarea
  oldName.value = nameTarea
  modalOpen.value = true
}

</script>
