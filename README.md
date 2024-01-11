# ai-fancifier
## Description
AI-Fancfier is a cutting-edge add-on for Google Docs that utilizes artificial intelligence to enhance and elevate the style and vocabulary of your writing
## Code
```Code.gs
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
```


```openai.gs

var API_KEY = ''; // insert api key

function callOpenAI(text, prompt) {
  var url = 'https://api.openai.com/v1/chat/completions';  
  
  var headers = {
    'Authorization': 'Bearer ' + API_KEY,
    'Content-Type': 'application/json'
  };

  var payload = {
    'model': 'gpt-3.5-turbo',
    'messages': [{
      'role': 'system',
      'content': prompt
    }, {
      'role': 'user',
      'content': text  
    }],
    'max_tokens': 256 
  };

  
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true  // Optional: handle exceptions silently
  };
  Logger.log("Sending openai request");
  var response = UrlFetchApp.fetch(url, options);
  Logger.log("All done with request! :>");
  var responseText = response.getContentText();
  var responseObject = JSON.parse(responseText);
  Logger.log("responseText:\n"+responseText)
  // Logger.log("responseObject:\n"+responseObject)
  return responseObject.choices[0].message.content;
  // need error handling
}
```
