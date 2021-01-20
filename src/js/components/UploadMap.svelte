<script></script>
<section class="pt-4 pb-8 px-0 border-t border-b border-black">
  <h2 class="flex items-center justify-between">
    <span>Map</span>
    <div class="ml-2">
      <input
        class="screenreader-only"
        type="file"
        id="mapSrc"
        accept=".jpg, .jpeg, .png, .gif, .webp"
      />
      <label class="button" id="mapSrcLabel" for="mapSrc"
        >Upload Map</label
      >
    </div>
  </h2>
  <div class="py-1">
    <p class="font-sans mt-0 mb-05 text-xs italic">
      Must be .jpg, .jpeg, .png, .gif, or .webp. Cannot exceed 3MB.
    </p>
    <p id="imgUploadError" hidden>
      <span class="font-sans mt-0 mb-05 text-xs text-error"
        >Image is too big. It must be less than 3MB.</span
      >
    </p>
  </div>
  <div class="py-1">
    <label for="pieceSize">Characters Base Size (px)</label>
    <input id="pieceSize" min="10" type="number" />
  </div>
</section>