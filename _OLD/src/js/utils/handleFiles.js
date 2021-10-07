import * as _ from "../globals/variables";
import DATA_STORE from "../globals/store";

export default function handleFiles(event) {
  const file = event.target.files[0];
  const maxMB = 3 * 1000 * 1000; // 1 MB = 1000 KB = 1000 B

  if (file.size <= maxMB) {
    const reader = new FileReader();
    reader.onload = (function () {
      return function (e) {
        DATA_STORE.data.map = e.target.result;
      };
    })();
    reader.readAsDataURL(file);

    if (!_.imgUploadError.hasAttribute("hidden")) {
      _.imgUploadError.addAttribute("hidden");
    }
  } else {
    _.imgUploadError.removeAttribute("hidden");
  }
}
