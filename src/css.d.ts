declare module "csstype" {
  interface Properties {
    // Allow namespaced CSS Custom Properties
    [index: `--${string}`]: string;
  }
}
