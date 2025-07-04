<template>
  <div
    class="w-[260px] bg-gray-200 dark:bg-zinc-900 z-[1000] rounded-sm p-2 flex flex-col items-center"
    data-cy="module-list"
  >
    <template v-if="modules.length">
      <div
        v-for="mod in modules"
        :key="mod.id"
        class="m-1 w-full"
      >
        <button
          type="button"
          class="w-full text-left cursor-pointer focus:outline-none relative group"
          @click="addModuleToPlan(mod)"
        >
          <ModuleCard
            v-if="mod?.name"
            :id="Number(mod.id)"
            :module="mod"
          />

          <div
            class="rounded-sm absolute inset-0 bg-black/30 flex
            items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <span class="text-5xl text-white select-none items-center ">+</span>
          </div>
        </button>
      </div>
    </template>

    <div
      v-else
      class="p-2 text-center text-gray-400"
    >
      Keine Module
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import ModuleCard from './Module.vue';
import { store } from '../helpers/store';
import { StorageHelper } from '../helpers/storage-helper';
import type { Module } from '../helpers/types';

export default defineComponent({
  name: 'ModuleList',
  components: { ModuleCard },
  props: {
    modules: {
      type: Array as PropType<Module[]>,
      required: true
    },
    baseSemester: {
      type: Number,
      default: null
    },
    position: {
      type: String as PropType<'left' | 'right'>,
      default: null
    }
  },
  emits: ['module-added'],
  methods: {
    addModuleToPlan(module: Module) {
      const semesters = [...store.getters.semesters].sort((a, b) => a.number - b.number);
      const plannedModules = store.getters.allPlannedModuleIds as string[];

      let targetSemesterNumber: number | null = null;

      if (this.baseSemester && this.position) {
        const offset = this.position === 'left' ? -1 : 1;
        const newSemesterNumber = this.baseSemester + offset;
        const semesterExists = semesters.some(s => s.number === newSemesterNumber);

        if (semesterExists) {
          targetSemesterNumber = newSemesterNumber;
        }
      }

      if (!targetSemesterNumber && module.predecessorModuleId && plannedModules.includes(module.predecessorModuleId)) {
        const semester = semesters.find((s, idx) =>
          s.moduleIds.includes(module.predecessorModuleId) && idx < semesters.length - 1
        );
        if (semester) targetSemesterNumber = semester.number + 1;
      }

      if (!targetSemesterNumber && module.successorModuleId && plannedModules.includes(module.successorModuleId)) {
        const semester = semesters.find((s, idx) =>
          s.moduleIds.includes(module.successorModuleId) && idx > 0
        );
        if (semester) targetSemesterNumber = semester.number - 1;
      }

      if (!targetSemesterNumber) {
        targetSemesterNumber = semesters[semesters.length - 1].number;
      }

      store.commit('addModuleToSemester', {
        semesterNumber: targetSemesterNumber,
        moduleId: module.id
      });

      this.updateUrlFragment();
      this.$emit('module-added', module);
    }
    ,
    updateUrlFragment() {
      StorageHelper.updateUrlFragment();
    },
  },
});
</script>