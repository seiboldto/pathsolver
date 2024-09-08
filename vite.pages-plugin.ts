import { type Plugin } from "vite";
import fs from "fs";
import path from "path";

// These scripts are adapted from https://github.com/rafgraph/spa-github-pages
const INDEX_SCRIPT = `(function(l) {
  if (l.search[1] === '/' ) {
    var decoded = l.search.slice(1).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location))`;

const ERROR_HTML = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>pathsolver</title>
    <script type="text/javascript">
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1).join('/') + '/?/' +
        l.pathname.slice(1).split('/').join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );

    </script>
  </head>
  <body>
  </body>
</html>`;

export function githubPagesSPA(): Plugin {
  let distPath: string;

  return {
    name: "github-pages-spa",
    apply: "build",
    configResolved: (config) => {
      distPath = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml: () => {
      return [
        {
          tag: "script",
          attrs: { type: "text/javascript" },
          children: INDEX_SCRIPT,
          injectTo: "head-prepend",
        },
      ];
    },
    writeBundle: async ({}) => {
      const errorPath = path.resolve(distPath, "404.html");
      fs.writeFileSync(errorPath, ERROR_HTML, "utf-8");
    },
  };
}
