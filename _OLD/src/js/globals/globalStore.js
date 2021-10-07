import * as _ from "./variables";
import { writable } from "svelte/store";
import characterBGimg from "../utils/characterBGimg";

function createGlobalStore() {
  const defaultData = {
    map: null,
    settingsExpanded: true,
    pieceSize: 24,
    zoom: 100,
    characters: [],
  };

  const { subscribe, set, update } = writable(defaultData);

  return {
    subscribe,
    set,
    updateData: (key, value) =>
      update((data) => {
        data[key] = value;
        localStorage.setItem(_.STORAGE_ID, JSON.stringify(data));
        return data;
      }),
    updateCharacter: (index, key, value) => {
      update((data) => {
        data.characters[index][key] = value;
        localStorage.setItem(_.STORAGE_ID, JSON.stringify(data));
        return data;
      });
    },
    addCharacter: (character) => {
      update((data) => {
        data.characters.push(character);
        localStorage.setItem(_.STORAGE_ID, JSON.stringify(data));
        return data;
      });
    },
    removeCharacter: (index) => {
      update((data) => {
        data.characters.splice(index, 1);
        localStorage.setItem(_.STORAGE_ID, JSON.stringify(data));
        return data;
      });
    },
  };
}

export const globalStore = createGlobalStore();
