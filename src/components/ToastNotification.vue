<template>
  <transition
    enter-active-class="duration-500 ease"
    enter-from-class="transform opacity-0"
    leave-active-class="duration-500 ease"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="isActive"
      class="rounded-sm p-4 mb-2 bg-red-500 text-white"
    >
      <span>{{ text }}</span>
      <ul v-if="listItems?.length">
        <li
          v-for="item in listItems"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
      <button
        v-if="dismissButtonText"
        class="block rounded-sm bg-slate-200/50 py-1 px-2 mt-2 hover:bg-slate-300/50 transition-colors duration-75"
        type="button"
        @click="$emit('on-dismiss')"
      >
        {{ dismissButtonText }}
      </button>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ToastNotification',
  props: {
    duration: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      required: true,
    },
    listItems: {
      type: Array<string>,
      default: () => [],
    },
    dismissButtonText: {
      type: String,
      default: null,
    },
    showToast: {
      type: Boolean
    }
  },
  emits: ['on-dismiss'],
  data() {
    return {
      isActive: false
    }
  },
  watch: {
    showToast: {
      handler() {
        this.isActive = this.showToast;
        if (this.duration !== 0 && this.isActive) {
          setTimeout(() => {
            this.isActive = false;
          }, this.duration);
        }
      },
      immediate: true,
    }
  }
});

</script>
