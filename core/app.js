document.addEventListener("DOMContentLoaded", function() {

  // Language mapping for synonyms data
  const langMap = {
    "English": "en",
    "Indonesian": "id"
  };

  let synonymsData = {}; // Loaded synonyms data

  // Function to collect synonyms data for a language
  function loadSynonyms(lang) {
    const code = langMap[lang];
    if (!code) return Promise.resolve({}); // If language not found, return empty object
    return fetch(`core/lang/${code}.json`)
      .then(response => response.json())
      .catch(err => {
        console.error("Error loading synonyms data:", err);
        return {};
      });
  }

  // Collect all elements needed for edit mode
  const editBtn = document.getElementById("edit-btn");
  const saveBtn = document.getElementById("save-btn");
  const outputText = document.getElementById("outputText");
  let outputEdit = document.getElementById("outputEdit");
  let suggestionBox = document.getElementById("synonym-suggestions");

  // Create suggestion box if not exists
  if (!suggestionBox) {
    suggestionBox = document.createElement("div");
    suggestionBox.id = "synonym-suggestions";
    document.body.appendChild(suggestionBox);
  }

  // Function to wrap words in editable span elements
  function wrapWords(text) {
    return text.replace(/(\S+)/g, '<span class="editable-word" style="cursor: pointer;">$1</span>');
  }

  // Enter edit mode
  editBtn.addEventListener("click", function() {
    outputText.style.display = "none";
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
    
    const text = outputText.value;
    outputEdit.innerHTML = wrapWords(text);
    outputEdit.style.display = "block";
    
    const targetLang = document.getElementById("target-lang").value;
    loadSynonyms(targetLang).then(data => {
      synonymsData = data;
    });
    
    const wordSpans = outputEdit.getElementsByClassName("editable-word");
    Array.from(wordSpans).forEach(span => {
      span.addEventListener("click", function(event) {
        event.stopPropagation();
        showSynonymSuggestions(span);
      });
    });
  });

  // Save changes and exit edit mode
  saveBtn.addEventListener("click", function() {
    const editedText = outputEdit.innerText;
    outputText.value = editedText;
    outputEdit.style.display = "none";
    outputText.style.display = "block";
    editBtn.style.display = "inline-block";
    saveBtn.style.display = "none";
    suggestionBox.style.display = "none";
  });

  // Display synonym suggestions for a word
  function showSynonymSuggestions(span) {
    const word = span.innerText.trim();
    let synonyms = synonymsData[word.toLowerCase()] || synonymsData[word];
    if (!synonyms || synonyms.length === 0) {
      suggestionBox.style.display = "none";
      return;
    }
    
    suggestionBox.innerHTML = "";
    synonyms.forEach(syn => {
      const synSpan = document.createElement("span");
      synSpan.innerText = syn;
      synSpan.style.margin = "0 5px";
      synSpan.style.cursor = "pointer";
      synSpan.addEventListener("click", function(e) {
        e.stopPropagation();
        span.innerText = syn;
        suggestionBox.style.display = "none";
      });
      suggestionBox.appendChild(synSpan);
    });
    
    const rect = span.getBoundingClientRect();
    suggestionBox.style.top = (rect.bottom + window.scrollY + 5) + "px";
    suggestionBox.style.left = (rect.left + window.scrollX) + "px";
    suggestionBox.style.display = "block";
  }

  //Hide suggestion box when clicked outside
  document.addEventListener("click", function(e) {
    suggestionBox.style.display = "none";
  });

  // Function to handle the translation process
  document.getElementById('swap-btn').addEventListener('click', function() {
    var sourceSelect = document.getElementById('source-lang');
    var targetSelect = document.getElementById('target-lang');
    var temp = sourceSelect.value;
    sourceSelect.value = targetSelect.value;
    targetSelect.value = temp;
  });
  
  document.getElementById('copy-btn').addEventListener('click', function() {
    outputText.select();
    document.execCommand('copy');
  });
  
  document.getElementById('translate-btn').addEventListener('click', function() {
    var inputText = document.getElementById('inputText').value;
    var sourceLang = document.getElementById('source-lang').value;
    var targetLang = document.getElementById('target-lang').value;
    
    outputText.style.display = 'none';
    outputEdit.style.display = 'none';
    document.getElementById('loading').style.display = 'flex';
    
    if (window.pywebview) {
      window.pywebview.api.translate(inputText, sourceLang, targetLang).then(function(result) {
        document.getElementById('loading').style.display = 'none';
        outputText.value = result;
        outputText.style.display = 'block';
      }).catch(function(error) {
        console.error(error);
        document.getElementById('loading').style.display = 'none';
        outputText.value = "Error during translation.";
        outputText.style.display = 'block';
      });
    } else {
      console.log("pywebview API not found.");
      document.getElementById('loading').style.display = 'none';
      outputText.style.display = 'block';
    }
  });

  // Function to avoid user from selecting the same language for source and target
  function updateLanguageOptions() {
    let sourceLang = document.getElementById("source-lang");
    let targetLang = document.getElementById("target-lang");

    for (let option of targetLang.options) {
      option.disabled = false;
    }
    for (let option of sourceLang.options) {
      option.disabled = false;
    }

    let selectedSource = sourceLang.value;
    let selectedTarget = targetLang.value;

    for (let option of targetLang.options) {
      if (option.value === selectedSource) {
        option.disabled = true;
      }
    }
    for (let option of sourceLang.options) {
      if (option.value === selectedTarget) {
        option.disabled = true;
      }
    }

    if (targetLang.value === selectedSource) {
      targetLang.value = targetLang.options[0].value;
    }
    if (sourceLang.value === selectedTarget) {
      sourceLang.value = sourceLang.options[0].value;
    }
  }

  // Event listener for language selection changes
  document.getElementById("source-lang").addEventListener("change", updateLanguageOptions);
  document.getElementById("target-lang").addEventListener("change", updateLanguageOptions);
  updateLanguageOptions();
});