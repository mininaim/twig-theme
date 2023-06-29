function removeConsoleLogFromBody() {
  const body = document.querySelector('body');
  const bodyContent = body.innerHTML;
  const modifiedBodyContent = bodyContent.replace(/\s*console\.log\('GLOBAL'\);\s*/g, '');
  body.innerHTML = modifiedBodyContent;
}
removeConsoleLogFromBody();
