<template>
  <button
    class="bg-gray-800 text-white dark:bg-gray-700 p-1 rounded-sm print:hidden"
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
                {{ plan.content }}
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
import {
  Dialog as HeadlessUIDialog,
  DialogPanel,
} from '@headlessui/vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { Plan } from "../types/Plan";
import { fetchPlanHistory } from "../api/plan";
import SavedPlansActionMenu from "./SavedPlansActionMenu.vue";

export default defineComponent({
  name: 'SavedPlansHistoryModal',
  components: {
    SavedPlansActionMenu,
    FontAwesomeIcon,
    HeadlessUIDialog, DialogPanel
  },
  props: {
    planId: {
      type: String,
      required: true
    }
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
          await this.getPlanHistory(this.planId);
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
