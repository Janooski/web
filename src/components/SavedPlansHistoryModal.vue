<template>
  <button
    class="
      flex items-center gap-2 w-full text-left px-4 py-2
      hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700
    "
    data-cy="SavedPlansHistoryDialog-Dialog-Button"
    type="button"
    @click="isOpen = true"
  >
    <font-awesome-icon
      :icon="['fas', 'clock-rotate-left']"
    />
  </button>
  <HeadlessUIDialog
    :open="isOpen"
    class="relative z-100"
    @close="() => isOpen = false"
  >
    <div
      class="fixed inset-0 flex w-screen items-center justify-center bg-black/30 dark:bg-black/70"
    >
      <DialogPanel>
        <div>
          <DialogTitle
            as="h3"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            {{ currentPlan.name }}
          </DialogTitle>
          <button
            class="bg-gray-800 text-white dark:bg-gray-700 p-1 rounded-sm print:hidden"
            data-cy="SavedPlansHistoryDialog-Close-Button"
            type="button"
            @click="isOpen = false"
          >
            <font-awesome-icon
              :icon="['fas', 'circle-xmark']"
            />
          </button>
        </div>
        <div>
          <ul>
            <li
              v-for="plan in planHistory"
              :key="plan.id"
              class="flex items-center justify-between"
              data-cy="SavedPlans-List-Item"
            >
              <router-link
                :to="plan.content"
                class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm flex-auto"
              >
                {{ plan.createdAt }} - {{ plan.content }}
              </router-link>
            </li>
          </ul>
        </div>
      </DialogPanel>
    </div>
  </HeadlessUIDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuth } from "@clerk/vue";
import { fetchPlanHistory } from "../api/plan";
import type { Plan } from "../types/Plan";
import {
  Dialog as HeadlessUIDialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClockRotateLeft, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

library.add(faClockRotateLeft, faCircleXmark);

export default defineComponent({
  name: 'SavedPlansHistoryModal',
  components: {
    FontAwesomeIcon,
    HeadlessUIDialog, DialogPanel, DialogTitle
  },
  props: {
    currentPlan: {
      type: Object as () => Plan,
      required: true
    },
  },
  setup() {
    const { getToken } = useAuth();

    return {
      getToken,
    };
  },
  data() {
    return {
      isOpen: false,
      planHistory: [] as Plan[],
    };

  },
  watch: {
    isOpen: {
      async handler(newValue) {
        if (newValue) {
          console.log(newValue)
          await this.getPlanHistory(this.currentPlan.id);
        }
      },
      deep: true,
      immediate: true,
    },
  },  methods: {
    async getPlanHistory(planId: string) {
      const token = await this.getToken() as string;
      this.planHistory = await fetchPlanHistory(planId, token);
    },
  },
});
</script>
