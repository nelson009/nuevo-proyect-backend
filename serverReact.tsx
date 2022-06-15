// @deno-types="https://deno.land/x/servest@v1.3.4/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.4/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import {
  contentTypeFilter,
  createApp,
} from "https://deno.land/x/servest@v1.3.4/mod.ts";

const app = createApp();

type array = string[];
let colores: array = [];

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body style={{ background: "black" }}>
          <h1 style={{ color: "blue" }}> Servest con React </h1>
          <form action="/color" method="post">
            <div>
              <label htmlFor="color" style={{ color: "white" }}>
                {" "}
                ingrese un color{" "}
              </label>
              <br></br>
              <input name="color" id="color"></input>
            </div>
            <div>
              <button> enviar </button>
            </div>
          </form>
          {colores.length === 0 ? (
            <>
              <h3 style={{ color: "white" }}>no hay lista de coleres</h3>
            </>
          ) : (
            <>
              <ul>
                {colores.map((ele: string) => (
                  <li key={ele} style={{ color: `${ele}` }}>{`${ele}`}</li>
                ))}
              </ul>
            </>
          )}
        </body>
      </html>
    ),
  });
});
app.post(
  "/color",
  contentTypeFilter("application/x-www-form-urlencoded"),
  async (req: any) => {
    const bodyForm = await req.formData();
    const color = bodyForm.value("color");
    colores.push(color);
    return req.redirect("/");
  }
);
app.listen({ port: 8080 });

//comando: denon run --allow-net  serverReact.tsx