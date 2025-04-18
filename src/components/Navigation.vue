<template>
  <nav
    class="flex sm:mx-4 items-center flex-wrap sm:flex-nowrap"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="flex items-center justify-between sm:justify-normal w-full sm:w-auto">
      <router-link to="/">
        <img
          src="../assets/logo.png"
          class="size-24 pb-4 object-contain"
          alt="Home"
        >
      </router-link>
      <button
        class="sm:hidden p-4"
        tabindex="0"
        aria-label="menu"
        aria-expanded="false"
        @click="onBurgerClick"
      >
        <font-awesome-icon
          :icon="['fa', 'bars']"
          size="2x"
        />
      </button>
    </div>
    <div class="flex w-full sm:w-1/3 sm:order-last relative mx-2 h-9 sm:h-auto">
      <div class="flex w-full absolute top-0 right-0 z-40">
        <SwitchGroup>
          <div class="flex ml-auto items-start">
            <SwitchLabel class="mr-4">
              Validierung:
            </SwitchLabel>
            <HeadlessSwitch
              :model-value="validationEnabled"
              :class="validationEnabled ? 'bg-teal-700' : 'bg-gray-500'"
              class="relative inline-flex h-9 w-16 sm:h-6 sm:w-11 items-center rounded-full"
              @update:model-value="setValidationEnabled"
            >
              <span
                aria-hidden="true"
                :class="validationEnabled ? 'translate-x-9 sm:translate-x-6' : 'translate-x-1'"
                class="inline-block h-6 w-6 sm:h-4 sm:w-4 transform rounded-full bg-white transition"
              />
            </HeadlessSwitch>
          </div>
        </SwitchGroup>
        <GlobalValidationInfo />
      </div>
    </div>
    <div
      class="w-full sm:inline-flex basis-full"
      :class="{ 'hidden': !isBurgerActive }"
    >
      <template
        v-for="category in categories"
        :key="category.title"
      >
        <div>
          <div class="px-2 sm:px-4 pt-4 pb-2 sm:py-6 peer">
            <button
              class="hover:cursor-auto mr-2 text-lg font-bold sm:text-md sm:font-normal"
              v-text="category.title"
            />
            <font-awesome-icon
              :icon="['fa', 'chevron-down']"
              class="peer invisible sm:visible"
            />
          </div>
          <div
            class="sm:hidden peer-hover:flex hover:flex flex rounded-sm sm:shadow-2xl bg-white flex-col sm:fixed z-10"
          >
            <a
              v-for="plan in category.plans"
              :key="plan.title"
              class="p-2 hover:bg-gray-100 rounded-sm"
              :href="`#/plan/${plan.path}?startSemester=${startSemesterName}`"
              @click="onBurgerClick"
              v-text="plan.title"
            />
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { SemesterInfo } from "../helpers/semester-info";
import { store } from '../helpers/store';
import GlobalValidationInfo from '../components/GlobalValidationInfo.vue';
import { Switch as HeadlessSwitch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { StorageHelper } from '../helpers/storage-helper';
import { mapGetters } from 'vuex';

/* eslint-disable max-len */
export default defineComponent({
  name: 'Navigation',
  components: {
    GlobalValidationInfo,
    HeadlessSwitch,
    SwitchGroup,
    SwitchLabel,
  },
  data() {
    return {
      isBurgerActive: false,
      startSemesterName: SemesterInfo.latestAutumnSemester().toString(),
      categories: [
        {
          title: 'Musterpläne Teilzeit',
          plans: [
            { title: 'Freie Modulwahl', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I-FP_OOP2_DigCod_CySec_AutoSpr_An2I-WE1_AlgDat_Bsys1_AIFo_Dbs1_EnglScience-KommIng2-PmQm_SEP1_ExEv-SEProj_SEP2_DigBusI-SAI21_WI2-BAI21_PhAI' },
            { title: 'Software Engineering', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I-FP_OOP2_DigCod_CySec_AutoSpr_An2I-WE1_AlgDat_Bsys1_AIFo_Dbs1_EnglScience-ParProg_SecSoW_Bsys2_AIAp_DatEng_KommIng2-PmQm_CoBau_MsTe_CPl_SEP1_ExEv-CPlA_DSy_SEProj_SEP2_DigBusI-UIP_AppArch_SAI21_WI2-CldSol_BAI21_PhAI' },
            { title: 'Cyber Security', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I-FP_OOP2_DigCod_CySec_AutoSpr_An2I-WE1_AlgDat_Bsys1_AIFo_Dbs1_EnglScience-WE2_SecSoW_Bsys2_CN2_KommIng2-PmQm_PlFSec_CldInf_NIoSec_SEP1_ExEv-CldOp_HackL_DSy_SEProj_SEP2_DigBusI-CyDef_AppArch_SAI21_WI2-IncResp_BAI21_PhAI' },
            { title: 'Network and Cloud Infrastructure', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I-FP_OOP2_DigCod_CySec_AutoSpr_An2I-WE1_AlgDat_Bsys1_AIFo_Dbs1_EnglScience-WE2_SModSim_DatAna_NetAut_CN2_KommIng2-PmQm_CldInf_NIoSec_SEP1_ExEv-CldOp_IBN_DSy_SEProj_SEP2_DigBusI-CyDef_AppArch_SAI21_WI2-CldSol_BAI21_PhAI' },
            { title: 'Data Science', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I-FP_OOP2_DigCod_CySec_AutoSpr_An2I-WE1_AlgDat_Bsys1_AIFo_Dbs1_EnglScience-WE2_MathFML_DatAna_AIAp_DatEng_KommIng2-PmQm_ML_MsTe_UIP_SEP1_ExEv-DL_DSy_SEProj_SEP2_DigBusI-BlCh_AppArch_SAI21_WI2-CldSol_BAI21_PhAI' },
            { title: 'Frontend Engineering (vor HS23)', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I-FP_OOP2_DigCod_CySec_AutoSpr_An2I-WE1_AlgDat_Bsys1_AIFo_Dbs1_EnglScience-WE2_SecSoW_Bsys2_AIAp_DatEng_KommIng2-PmQm_WE3_MsTe_UIP_SEP1_ExEv-UX_DSy_SEProj_SEP2_DigBusI-ComGra_AppArch_SAI21_WI2-CldSol_BAI21_PhAI' },
          ],
        },
        {
          title: 'Musterpläne Vollzeit',
          plans: [
            { title: 'Freie Modulwahl', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I_Dbs1_EnglScience-FP_OOP2_DigCod_CySec_AutoSpr_An2I_KommIng2-WE1_AlgDat_Bsys1_AIFo_SEP1_ExEv-SEProj_SEP2_DigBusI-PmQm_SAI21_WI2-BAI21_PhAI' },
            { title: 'Software Engineering', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I_Dbs1_EnglScience-FP_OOP2_DigCod_CySec_AutoSpr_An2I_DatEng_KommIng2-WE1_AlgDat_Bsys1_AIFo_MsTe_CPl_SEP1_ExEv-ParProg_SecSoW_Bsys2_AIAp_DSy_SEProj_SEP2_DigBusI-PmQm_CoBau_UIP_AppArch_SAI21_WI2-CPlA_CldSol_BAI21_PhAI' },
            { title: 'Cyber Security', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I_Dbs1_EnglScience-FP_OOP2_DigCod_CySec_AutoSpr_An2I_CN2-WE1_AlgDat_Bsys1_AIFo_CldInf_NIoSec_SEP1_ExEv-WE2_SecSoW_Bsys2_DSy_SEProj_SEP2_DigBusI-PmQm_PlFSec_CyDef_AppArch_SAI21_WI2-CldOp_HackL_KommIng2_IncResp_BAI21_PhAI' },
            { title: 'Network and Cloud Infrastructure', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I_Dbs1_EnglScience-FP_OOP2_DigCod_CySec_AutoSpr_An2I_CN2-WE1_AlgDat_Bsys1_AIFo_CldInf_NIoSec_SEP1_ExEv-WE2_SModSim_DatAna_NetAut_DSy_SEProj_SEP2_DigBusI-PmQm_CyDef_AppArch_SAI21_WI2-CldOp_IBN_KommIng2_CldSol_BAI21_PhAI' },
            { title: 'Data Science', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I_Dbs1_EnglScience-FP_OOP2_DigCod_CySec_AutoSpr_An2I_DatEng_KommIng2-WE1_AlgDat_Bsys1_AIFo_MsTe_UIP_SEP1_ExEv-WE2_MathFML_DatAna_AIAp_DSy_SEProj_SEP2_DigBusI-PmQm_ML_AppArch_BlCh_SAI21_WI2-DL_CldSol_BAI21_PhAI' },
            { title: 'Frontend Engineering (vor HS23)', path: 'RheKoI_OOP1_AutPy_CN1_DMI_An1I_Dbs1_EnglScience-FP_OOP2_DigCod_CySec_AutoSpr_An2I_DatEng_KommIng2-WE1_AlgDat_Bsys1_AIFo_MsTe_UIP_SEP1_ExEv-WE2_SecSoW_Bsys2_AIAp_DSy_SEProj_SEP2_DigBusI-PmQm_WE3_ComGra_AppArch_SAI21_WI2-UX_CldSol_BAI21_PhAI' },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'validationEnabled'
    ]),
  },
  methods: {
    onBurgerClick() {
      this.isBurgerActive = !this.isBurgerActive;
    },
    setValidationEnabled(validationEnabled: boolean) {
      store.commit('setValidationEnabled', validationEnabled);
      StorageHelper.updateUrlFragment();
    },
  },
});
</script>
