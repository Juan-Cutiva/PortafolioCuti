// Declaraciones para los paquetes `@fontsource(-variable)` que no vienen con tipos propios —
// se usan solo por sus efectos secundarios (inyectan @font-face). Sin esto, TS marca:
// "No se pueden encontrar declaraciones de módulo o tipo para la importación de efectos
// secundarios de '@fontsource-variable/geist'".

declare module '@fontsource-variable/geist';
declare module '@fontsource-variable/geist/*';
declare module '@fontsource-variable/roboto-mono/*';
declare module '@fontsource/*';
