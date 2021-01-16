import { writable } from "svelte/store";

function createGlobalStore() {
  const defaultData = {
    settingsExpanded: true,
  };

  const { subscribe, set, update } = writable(defaultData);

  return {
    subscribe,
    updateData: (key, content) =>
      update((data) => {
        data[key] = content;
        return data;
      }),
  };
}

export const globalStore = createGlobalStore();
