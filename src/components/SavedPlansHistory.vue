<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                PLANE NAME history
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Add list of table history
                </p>
              </div>

              <div class="mt-4 flex justify-end">
                <button
                  type="button"
                  class="rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { ref, watch, defineComponent } from 'vue'
import { useAuth } from "@clerk/vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { PlanStore, type Plan } from '../helpers/plan-store'

export default defineComponent({
  name: 'SavedPlansHistory',
  setup() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const showHistoryDialog = ref(false);
    const historyPlanId = ref<string | null>(null);

    return {
      getToken,
      isLoaded,
      isSignedIn,
      historyPlanId,
      showHistoryDialog,
    };
  },
  props: {
    planId: {
      type: String,
      required: false,
    },
  },
  emits: ['close'],
  data() {
    return {
      isOpen: true,
      planHistory: [] as Plan[], // store the fetched history
    }
  },
  watch: {
    async planId(newPlanId) {
      this.isOpen = true
      console.log("newPlanID")
      console.log(newPlanId)
      if (newPlanId) {
        this.fetchSavedPlanHistory(newPlanId)
      }
    },
  },
  methods: {
    closeModal() {
      this.isOpen = false
      this.$emit('close')
    },
    openModal() {
      this.isOpen = true
    },
    async fetchSavedPlanHistory(planId: string): Promise<Plan[]> {
      const token = await this.getToken() as string;
      this.planHistory = await new PlanStore().fetchSavedPlanHistory(planId, token)
      console.log(this.planHistory)
      return this.planHistory
    },
  },
})
</script>
