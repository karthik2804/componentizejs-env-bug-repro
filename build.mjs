import { componentize } from '@bytecodealliance/componentize-js';
import { readFile, writeFile } from 'node:fs/promises';


let src = await readFile("index.js", "utf8");
const { component } = await componentize(src, {
    sourceName: "index.js",
    witPath: "./wit",
    debugBuild: true,
    worldName: "http-trigger",
    enableFeatures: ["http"],
}

);

await writeFile('test.component.wasm', component);
