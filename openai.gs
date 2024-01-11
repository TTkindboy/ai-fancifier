var API_KEY = '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';

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
