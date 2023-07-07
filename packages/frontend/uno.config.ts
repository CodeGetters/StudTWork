import { defineConfig, presetIcons } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  rules: [
    ["m-1", { margin: "1px" }],
    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^m-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  ],
});
// .m-1 { margin: 1px; }
// .m-7.5 { margin: 7.5px; }

import { Preset } from "unocss";

export const customPreset: Preset = {
  name: "custom-preset",
  shortcuts: [{ logo: "i-logos-vue w-6em h-6em transform transition-800" }],
  // presets: [], // disable default preset
  presets: [
    presetRemToPx(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
      collections: {
        // custom: FileSystemIconLoader(iconDirectory),
      },
    }),
  ],
  // rules: [
  //   [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  //   [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
  // ],
  // variants: [/* ... */],
  // shortcuts: [/* ... */]
};

// You can use previous custom preset

// import { defineConfig } from 'unocss'
// import { myPreset } from './my-preset'

// export default defineConfig({
//   presets: [
//     myPreset // your own preset
//   ],
// })
