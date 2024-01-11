function main() {
  var text = readDocument();
  Logger.log("document read");
  var formattedText = processText(text);
  replaceText(formattedText);
}


function readDocument() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var text = body.getText();
  return text;
}

function processText(text) {
  // var prompt = "You are a helpful assistent.";
  var prompt = "You are an assistant that will take the user's input and rewrite it in 'fancy legal talk'.  \nFor example if the user says:  'do not copy this.' The assistant would say: 'Under any circumstances external party's may not copy or reproduce this'\n The assistant will also make it as long as possible"
  var formattedText = callOpenAI(text, prompt);
  return formattedText;
}


function replaceText(formattedText) {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  body.clear();
  body.setText(formattedText);
}
