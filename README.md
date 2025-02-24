# ComponentizeJS bug repro

Building http triggered apps without `wasi:cli/environment@0.2.3` import breaks due to attempts to use `environ_sizes_get`.

## Steps to reproduce

First build with `wasi:cli/environment@0.2.3` imported (this is already set up)
- `npm install` to install dependencies
- `node build.mjs` to build the component
- The component can then be served using `wastime serve -S=common test.component.wasm`
- `curl localhost:3000` should return `hello world`

Once it is tested to work, comment out the `wasi:cli/environment@0.2.3` import in [./wit/world.wit](./wit/world.wit)
- Run `node build.mjs` again to build the component
- The component can then be served using `wastime serve -S=common test.component.wasm` 
- `curl localhost:3000` returns the following error
```bash
Serving HTTP on http://0.0.0.0:8080/
2025-02-24T09:45:19.551461Z ERROR wasmtime_cli::commands::serve: [0] :: Error {
    context: "error while executing at wasm backtrace:\n    0: 0x80bb6f - <unknown>!environ_sizes_get\n    1: 0x7fd4aa - <unknown>!<wasm function 13401>\n    2: 0x2b673 - <unknown>!<wasm function 247>",
    source: UnreachableCodeReached,
}    
error: hyper::Error(User(Service), guest never invoked `response-outparam::set` method: error while executing at wasm backtrace:
    0: 0x80bb6f - <unknown>!environ_sizes_get
    1: 0x7fd4aa - <unknown>!<wasm function 13401>
    2: 0x2b673 - <unknown>!<wasm function 247>

Caused by:
    wasm trap: wasm `unreachable` instruction executed)
```