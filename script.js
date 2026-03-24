let files = {
  "index.html": "<h1>Hello AsyncRose 🚀</h1>",
  "style.css": "body { background: black; color: white; }",
  "script.js": "console.log('Hello World');"
};

let currentFile = "index.html";
let editor;

// Init
window.onload = () => {
  editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "xml"
  });

  renderFiles();
  openFile("index.html");
};

// Show files
function renderFiles() {
  const list = document.getElementById("fileList");
  list.innerHTML = "";

  Object.keys(files).forEach(file => {
    const div = document.createElement("div");
    div.innerText = file;

    div.onclick = () => openFile(file);
    list.appendChild(div);
  });
}

// Open file
function openFile(file) {
  saveCurrent();

  currentFile = file;
  editor.setValue(files[file]);

  // Change mode
  if (file.endsWith(".html")) editor.setOption("mode", "xml");
  if (file.endsWith(".css")) editor.setOption("mode", "css");
  if (file.endsWith(".js")) editor.setOption("mode", "javascript");
}

// Save current file
function saveCurrent() {
  if (editor) {
    files[currentFile] = editor.getValue();
  }
}

// Add new file
function addFile() {
  const name = prompt("Enter file name (e.g. app.js):");
  if (!name) return;

  files[name] = "";
  renderFiles();
}

// Run project (combine files)
function runCode() {
  saveCurrent();

  const html = files["index.html"] || "";
  const css = files["style.css"] || "";
  const js = files["script.js"] || "";

  const code = `
    <html>
    <style>${css}</style>
    <body>
    ${html}
    <script>${js}<\/script>
    </body>
    </html>
  `;

  document.getElementById("output").srcdoc = code;
}

// Download full project
function downloadCode() {
  saveCurrent();

  let fullCode = `
    <html>
    <style>${files["style.css"] || ""}</style>
    <body>
    ${files["index.html"] || ""}
    <script>${files["script.js"] || ""}<\/script>
    </body>
    </html>
  `;

  const blob = new Blob([fullCode], { type: "text/html" });
  const a = document.createElement("a");

  a.href = URL.createObjectURL(blob);
  a.download = "project.html";
  a.click();
}

// Shortcuts
document.addEventListener("keydown", (e) => {

  if (e.ctrlKey && e.key === "Enter") {
    runCode();
  }

  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    downloadCode();
  }
});