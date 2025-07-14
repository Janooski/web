<template>
  <HeadlessUIMenu
    as="div"
    class="relative inline-block text-left z-50"
  >
    <div>
      <MenuButton
        class="p-2 hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-sm"
        data-cy="SavedPlansActionMenu-Menu-Button"
      >
        <font-awesome-icon
          :icon="['fas', 'ellipsis']"
        />
      </MenuButton>
    </div>
    <MenuItems
      class="absolute z-10 bg-white dark:bg-zinc-800 shadow-lg rounded-sm"
      :class="menuPositionClass"
    >
      <MenuItem
        v-slot="{ close }"
        as="div"
      >
        <button
          class="
           flex items-center gap-2 w-full text-left px-4 py-2
          hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700
          "
          data-cy="SavedPlansActionMenu-Share-Button"
          @click.stop.prevent="sharePlan(close)"
        >
          <font-awesome-icon
            data-cy="SavedPlansActionMenu-Share-Icon"
            :icon="planCopied ? ['fas', 'check'] : ['fas', 'share-nodes']"
            :class="planCopied ? 'text-green-600' : 'text-black dark:text-white'"
          />
        </button>
      </MenuItem>
      <MenuItem
        as="div"
      >
        <SavedPlansHistoryModal
          :current-plan="plan"
        />
      </MenuItem>
      <MenuItem
        as="div"
      >
        <button
          class="
            flex items-center gap-2 w-full text-left px-4 py-2
            hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700
          "
          data-cy="SavedPlansActionMenu-Delete-Button"
          @click="deletePlan"
        >
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
      </MenuItem>
    </MenuItems>
  </HeadlessUIMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Plan } from '../types/Plan';
import SavedPlansHistoryModal from "./SavedPlansHistoryModal.vue";
import { Menu as HeadlessUIMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash, faCheck, faEllipsis, faShareNodes, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faTrash, faCheck, faEllipsis, faShareNodes, faClockRotateLeft );

export default defineComponent({
  name: 'SavedPlansActionMenu',
  components: {
    SavedPlansHistoryModal,
    HeadlessUIMenu,
    MenuButton,
    MenuItems,
    MenuItem,
    FontAwesomeIcon
  },
  props: {
    plan: {
      type: Object as () => Plan,
      required: true
    },
    menuPositionClass: {
      type: String,
      default: 'top-0 left-full ml-1'
    }
  },
  emits: ['delete'],
  data() {
    return {
      planCopied: false
    }
  },
  methods: {
    async deletePlan() {
      this.$emit('delete', this.plan.id);
    },
    async sharePlan(close: () => void) {
      const baseUrl = window.location.origin;
      const shareUrl = `${baseUrl}/#/shared/${this.plan.publicSlug}`;
      try {
        await navigator.clipboard.writeText(shareUrl);
        this.planCopied = true;
        setTimeout(() => {
          this.planCopied = false;
          close();
        }, 1000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    },
  }
});
</script>
