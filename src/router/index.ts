import { createRouter, createWebHistory } from 'vue-router';
import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import ProjectView from '@/modules/projects/views/ProjectView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'projects' },
      component: ProjectsLayout,
      children: [
        {
          path: 'projects',
          name: 'projects',
          component: ProjectsView,
        },
        {
          path: 'proyecto/:id',
          name: 'proyectoID',
          component: ProjectView,
        }
      ],
    },
  ],
});

export default router;
