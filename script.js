const socket = io();

const codeEditor1 = CodeMirror.fromTextArea(document.getElementById('code-editor-1'), {
  lineNumbers: true,
  mode: 'javascript', // Default
});

const codeEditor2 = CodeMirror.fromTextArea(document.getElementById('code-editor-2'), {
  lineNumbers: true,
  mode: 'javascript',
});

const languageSelect = document.getElementById('language-select');

// Change CodeMirror mode based on the selected language
languageSelect.addEventListener('change', () => {
  const selectedLanguage = languageSelect.value;
  codeEditor1.setOption('mode', selectedLanguage);
  codeEditor2.setOption('mode', selectedLanguage);
});

codeEditor1.on('change', (editor) => {
  const code = editor.getValue();
  socket.emit('code-change', code);
});

socket.on('code-change', (data) => {
  codeEditor2.setValue(data);
});

socket.on('init-code', (initCode) => {
  codeEditor1.setValue(initCode);
});

