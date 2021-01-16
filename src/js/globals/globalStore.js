import { writable } from "svelte/store";

function createGlobalStore() {
  const { subscribe, set, update } = writable({ settingsExpanded: true });

  return {
    subscribe,
    updateData: function (key, content) {
      update(function (data) {
        data[key] = content;
      });
    },
    setData: (content) => set({ key: content }),
  };
}

export const globalStore = createGlobalStore();
