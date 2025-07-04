# web

[![Build](https://github.com/lost-university/web/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/lost-university/web/actions/workflows/ci.yml)

This project is a tool to plan your semesters at OST Rapperswil. The params in the URL will be updated automatically so you can save your data by copying the current URL.

See [Example](https://lost.university/#/plan/RheKoI_OOP1_AutPy_CN1_DMI_An1I-FP_OOP2_DigCod_CySec_AutoSpr_An2I-WE1_AlgDat_Bsys1_AIFo_Dbs1_EnglScience-ParProg_SecSoW_Bsys2_AIAp_DatEng_KommIng2-PmQm_CoBau_MsTe_CPl_SEP1_ExEv-CPlA_DSy_SEProj_SEP2_DigBusI-PF_AppArch_SAI21_WI2-CldSol_BAI21_PhAI)

## Contributing
Check the [open issues](https://github.com/lost-university/web/issues) to see what you can work on.

## Project setup

A [Clerk](https://clerk.com/) publishable key is needed to run the project in combination with the backend. Copy the `example.env` file to `.env` and set the variable. 
> You don't have to set it up if you only want to run the frontend without the backend. 

```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints
```
npm run lint
```

### Auto-fix your linter errors (if possible)
```
npm run lint-fix
```

### Customize configuration
See [Configuration Reference](https://vitejs.dev/config/).

## Testing

Since the tests cover authenticated behaviour with the backend, a [Clerk](https://clerk.com/) publishable key as well as a secret key is needed to run the e2e tests. Copy the `example.cypress.env.json` to `cypress.env.json` and fill in the values. 

### Develop component tests
```
npm run test:component:dev
```

### Run component tests
```
npm run test:component
```

### Develop E2E tests
The dev server as well as the backend must be running to run the e2e tests.

```
npm run dev
npm run test:dev
```

### Run E2E tests
```
npm run test
```

## Pipeline

The pipeline is configured to set the `CLERK_PUBLISHABLE_KEY` environment variable which is stored inside a github secret. The token will be compiled into the docker container. If the publishable key has changed, a new image must be built. This is because the application is compiled into static files so there is no node server when running in production which could set the token dynamically. 
> As the name publishable key suggests, it is not a secret. It is only used to identify the application and to allow Clerk to serve the correct configuration. It is limited to the url configured for this application.



