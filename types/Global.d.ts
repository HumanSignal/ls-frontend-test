export {};
declare global {
  interface Window {
    APP_SETTINGS: Record<string, any>;
    __FEATURE_FLAGS__: Record<string, boolean>;
    LSF_CONFIG: Record<any, any>;
    DEFAULT_LSF_INIT: boolean,
    LabelStudio: any;
    Htx: any;
  }
}
