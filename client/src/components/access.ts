export const mapping = {
  0: "Управление",
  1: "Артикули",
  2: "Поръчки",
  3: "Служители",
} as { [key: number]: string };

export function getMappedValue(key: number): string {
  return mapping[key] ?? "Unknown key";
}
