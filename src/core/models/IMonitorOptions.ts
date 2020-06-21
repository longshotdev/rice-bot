export default interface IMonitorOptions {
  enabled: boolean;
  allowedTypes?: string[];
  ignoreBots?: boolean;
  ignoreSelf?: boolean;
  ignoreEdits?: boolean;
  name: string;
  emitsOnlyIn: string[];
}
