import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess({}),

    kit: {
        adapter: adapter({
            pages: "svelte-build",
            assets: "svelte-build",
        }),
        alias: {
            $components: "./src/components",
            $data: "./src/data",
            $lib: "./src/lib",
            $scripts: "./src/scripts",
            $stores: "./src/stores",
            $styles: "./src/styles",
            $types: "./src/types",
        },
    },

    onwarn: (warning, handler) => {
        const { code, } = warning

        if (
            [
                "a11y-click-events-have-key-events",
                "a11y-no-static-element-interactions",
                "a11y-no-noninteractive-element-interactions",
                "a11y-missing-attribute",
            ].includes(code)
        ) {
            return
        }

        handler(warning)
    },
}

export default config
