const fromText = document.querySelector('.from-to'),
toText = document.querySelector('.to-text'),
selectTag = document.querySelectorAll('select'),
exchangeBtn = document.querySelector('.exchange'),
icons = document.querySelectorAll('.icons i'),
translateBtn = document.querySelector('button');

selectTag.forEach( (tag, id) => {
    for (const country_code in countries ) {
    // selecting from langauge to eng and to langauge to nep
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected";
        }else if(id == 1 && country_code == "ne-NP"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected} >${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); //adding options in select
    }
});


exchangeBtn.addEventListener('click',() =>{
// exchanging select and textarea values

    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;
    let tempLang = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener('click', () =>{
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}&de=billthakur03@gmail.com`;
    
    // fetching data and changing into js object and then working with it
    fetch(apiUrl).then(res=> res.json()).then( data =>{
        console.log(data);
        toText.value = data.responseData.translatedText;
    });
});

icons.forEach( (icon)=>{
    icon.addEventListener('click', ({target})=>{
        if (target.classList.contains('fa-copy')) {
            // copy text from 'from' text if id is from else from to
            if (target.id == 'from') {
          navigator.clipboard.writeText(fromText.value);
            }else{
          navigator.clipboard.writeText(toText.value);
            }
            
        }else{
          let utterance;
            if (target.id == 'from') {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value);  
                utterance.lang = selectTag[1].value;             
            }
            speechSynthesis.speak(utterance);
        }
    });
});

console.log(selectTag[1].value)