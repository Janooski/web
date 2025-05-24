<template>
  <Popover
    class="hidden sm:block relative"
  >
    <PopoverButton
      class="mx-2 sm:mx-4 mt-4 mb-2 sm:my-6 text-lg font-bold sm:text-md sm:font-normal"
      data-cy="SavedPlans-Dropdown-Button"
    >
      <span class="mr-2">Gespeicherte Pläne</span>
      <font-awesome-icon
        :icon="['fa', 'chevron-down']"
        class="peer invisible sm:visible"
      />
    </PopoverButton>
    <PopoverPanel
      class="absolute transform rounded-sm sm:shadow-2xl bg-white dark:bg-zinc-800 flex-col sm:fixed z-50"
    >
      <ul>
        <li
          v-for="plan in modulePlans"
          :key="plan.id"
          class="relative flex items-center justify-between"
          data-cy="SavedPlans-List-Item"
        >
          <button
            class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm"
            data-cy="SavedPlans-Bookmark-Button"
            @click="bookmarkPlan(plan.id)"
          >
            <font-awesome-icon
              :icon="[plan.bookmark ? 'fas' : 'far', 'bookmark']"
            />
          </button>
          <router-link
            :to="plan.content"
            class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm flex-auto"
          >
            {{ plan.name }}
          </router-link>
          <div
            class="relative"
            @mouseenter="activePlanId = plan.id"
            @mouseleave="activePlanId = null"
          >
            <div class="p-2 hover:bg-gray-100 rounded-sm">
              <font-awesome-icon
                :icon="['fas', 'ellipsis-vertical']"
                class="w-4 h-4"
              />
            </div>
            <div
              v-if="activePlanId === plan.id"
              class="absolute top-0 left-full mt-1 bg-white shadow-lg rounded-sm z-10"
            >
              <button
                class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                @click="sharePlan(plan.id)"
              >
                <font-awesome-icon
                  :icon="copiedPlanId === plan.id ? ['fas', 'check'] : ['fas', 'share']"
                  :class="copiedPlanId === plan.id ? 'text-green-600' : 'text-black'"
                />
                <span class="sr-only">Teilen</span>
              </button>
              <button
                class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                @click="deletePlan(plan.id)"
              >
                <font-awesome-icon
                  :icon="['fas', 'trash']"
                />
                <span class="sr-only">Löschen</span>
              </button>
            </div>
          </div>
        </li>
      </ul>
      <form
        class="flex items-center justify-between"
        @submit.prevent="savePlan"
      >
        <input
          v-if="isEditingName"
          v-model="planName"
          type="text"
          class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm flex-auto"
          placeholder="Plan Namen eingeben"
          data-cy="SavePlan-Name"
        >
        <button
          v-if="isEditingName"
          type="submit"
          class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm"
          data-cy="SavePlan-Submit"
        >
          Erstellen
        </button>
      </form>
      <button
        v-if="!isEditingName"
        class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm text-left"
        data-cy="SavePlan-Button"
        @click="() => isEditingName = !isEditingName"
      >
        + Aktuellen Plan speichern
      </button>
    </PopoverPanel>
  </Popover>

  <div class="flex flex-col sm:hidden">
    <span
      class="mx-2 mt-2 text-lg font-bold sm:text-md sm:font-normal"
      data-cy="SavedPlans-Title-Mobile"
    >
      Gespeicherte Pläne
    </span>
    <ul>
      <li
        v-for="plan in modulePlans"
        :key="plan.id"
        class="flex items-center justify-between"
        data-cy="SavedPlans-List-Item"
      >
        <button
          class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm"
          data-cy="SavedPlans-Bookmark-Button"
          @click="bookmarkPlan(plan.id)"
        >
          <font-awesome-icon
            :icon="[plan.bookmark ? 'fas' : 'far', 'bookmark']"
          />
        </button>
        <router-link
          :to="plan.content"
          class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm flex-auto"
        >
          {{ plan.name }}
        </router-link>
        <button
          class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm"
          data-cy="SavedPlans-Delete-Button"
          @click="deletePlan(plan.id)"
        >
          Löschen
        </button>
      </li>
    </ul>
    <form
      class="flex items-center justify-between"
      @submit.prevent="savePlan"
    >
      <input
        v-if="isEditingName"
        v-model="planName"
        type="text"
        class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm flex-auto"
        placeholder="Plan Namen eingeben"
        data-cy="SavePlan-Name"
      >
      <button
        v-if="isEditingName"
        type="submit"
        class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm"
        data-cy="SavePlan-Submit"
      >
        Erstellen
      </button>
    </form>
    <button
      v-if="!isEditingName"
      class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm text-left"
      data-cy="SavePlan-Button"
      @click="() => isEditingName = !isEditingName"
    >
      + Aktuellen Plan speichern
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from "@clerk/vue";
import { type Plan, PlanStore } from "../helpers/plan-store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faShare, faCheck, faChevronDown, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash, faShare, faCheck, faChevronDown, faEllipsisVertical);

export default defineComponent({
  name: 'SavedPlans',
  components: { FontAwesomeIcon },
  setup() {
    const { getToken, isLoaded, isSignedIn } = useAuth();
    const activePlanId = ref<string | null>(null);
    const copiedPlanId = ref<string | null>(null);
    return {
      getToken,
      isLoaded,
      isSignedIn,
      activePlanId,
      copiedPlanId,
    };
  },
  data() {
    return {
    modulePlans: [] as Plan[],
    isEditingName: false,
    planName: '',
    }
  },
  computed: {
    isClerkReady() {
      return this.isLoaded && this.isSignedIn;
    }
  },
  watch: {
    isSignedIn: {
      async handler(newValue) {
        if (newValue) {
          await this.getPlans();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async getPlans() {
      const token = await this.getToken() as string;
      this.modulePlans = await fetchSavedPlans(token);
    },
    async savePlan() {
      const token = await this.getToken() as string;
      let plan = this.$route.path.replace('/plan/', '') + "?" + new URLSearchParams(this.$route.query).toString();
      await savePlan(this.planName, plan, token);
      this.isEditingName = false;
      this.planName = '';
      await this.getPlans();
    },
    async deletePlan(planId: string) {
      const token = await this.getToken() as string;
      await deletePlan(planId, token)
      await this.getPlans();
    },
    async sharePlan(planId: string) {
      const plan = this.modulePlans.find(p => p.id === planId);
      if (!plan || !plan.public_slug) {
        console.error('No public_slug found for this plan');
        return;
      }

      const baseUrl = window.location.origin;
      const shareUrl = `${baseUrl}/#/shared/${plan.public_slug}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        console.log('Link copied to clipboard:', shareUrl);
        this.copiedPlanId = planId;
        // Reset after 2 seconds
        setTimeout(() => {
          this.copiedPlanId = null;
        }, 2000);
        // Optionally show a toast or notification here
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    },
  },
})
</script>
