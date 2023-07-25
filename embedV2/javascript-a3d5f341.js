import { conf as t, language as e } from "./typescript-8ac53d6a.js";
import "./libs-0c2ad75d.js";
import "https://cdn.skypack.dev/pin/react@v17.0.1-yH0aYV1FOvoIPeKBbHxg/mode=imports,min/optimized/react.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/mode=imports,min/optimized/react-dom.js";
import "https://cdn.skypack.dev/pin/react-dom@v17.0.1-oZ1BXZ5opQ1DbTh7nu9r/dist=es2020,mode=imports,min/unoptimized/cjs/react-dom-server.browser.production.min.js";
var n = t, l = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: "invalid",
  tokenPostfix: ".js",
  keywords: [
    "break",
    "case",
    "catch",
    "class",
    "continue",
    "const",
    "constructor",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "from",
    "function",
    "get",
    "if",
    "import",
    "in",
    "instanceof",
    "let",
    "new",
    "null",
    "return",
    "set",
    "super",
    "switch",
    "symbol",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "undefined",
    "var",
    "void",
    "while",
    "with",
    "yield",
    "async",
    "await",
    "of"
  ],
  typeKeywords: [],
  operators: e.operators,
  symbols: e.symbols,
  escapes: e.escapes,
  digits: e.digits,
  octaldigits: e.octaldigits,
  binarydigits: e.binarydigits,
  hexdigits: e.hexdigits,
  regexpctl: e.regexpctl,
  regexpesc: e.regexpesc,
  tokenizer: e.tokenizer
};
export {
  n as conf,
  l as language
};
