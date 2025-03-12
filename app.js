document.getElementById('swap-btn').addEventListener('click', function() {
    var sourceSelect = document.getElementById('source-lang');
    var targetSelect = document.getElementById('target-lang');
    var temp = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = temp;
  });
  
  document.getElementById('copy-btn').addEventListener('click', function() {
    var outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
  });
  
  document.getElementById('translate-btn').addEventListener('click', function() {
    var inputText = document.getElementById('inputText').value;
    var sourceLang = document.getElementById('source-lang').value;
    var targetLang = document.getElementById('target-lang').value;
    
    document.getElementById('outputText').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    
    if (window.pywebview) {
      window.pywebview.api.translate(inputText, sourceLang, targetLang).then(function(result) {

        document.getElementById('loading').style.display = 'none';
        document.getElementById('outputText').style.display = 'block';
        document.getElementById('outputText').value = result;
      }).catch(function(error) {
        console.error(error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('outputText').style.display = 'block';
        document.getElementById('outputText').value = "Error during translation.";
      });
    } else {
      console.log("pywebview API not found.");
      document.getElementById('loading').style.display = 'none';
      document.getElementById('outputText').style.display = 'block';
    }
});