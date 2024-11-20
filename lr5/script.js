var tab;
var tabContent;

window.onload=function() {
    tabContent=document.getElementsByClassName('tabContent');
    tab=document.getElementsByClassName('tab');
    hideTabsContent(1);
}

function hideTabsContent(a) {
    for(var i=a; i<tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}

document.getElementById('tabs').onclick=function(event) {
    var target = event.target;
    if (target.className =='tab') {
        for(var i=0; i<tab.length;i++) {
            if (target == tab[i]){
                showTabsContent(i);
                break
            }
        }
    }
}

function showTabsContent(b) {
    if(tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

function generateRad() {
    var rtl = document.getElementById('rtl').value;
    var rtr = document.getElementById('rtr').value;
    var rbl = document.getElementById('rbl').value;
    var rbr = document.getElementById('rbr').value;

    document.getElementById('ttl').value = rtl;
    document.getElementById('ttr').value = rtr;
    document.getElementById('tbl').value = rbl;
    document.getElementById('tbr').value = rbr;

    var block = document.getElementById('block');
    block.style.borderRadius = `${rtl}px ${rtr}px ${rbr}px ${rbl}px`;

    var code = `border-radius: ${rtl}px ${rtr}px ${rbr}px ${rbl}px;`;
    document.getElementById('codeRad').value = code;
}

function generateDisplay() {
    var displayValue = document.getElementById('displaySelect').value;
    var childBlocks = document.querySelectorAll('#displayBlock .childBlock');
    childBlocks.forEach((block) => {
        block.style.display = displayValue;
    });
    var сode = `#displayBlock .childBlock {\n  display: ${displayValue};\n}`;
    document.getElementById('сodeDisplay').value = сode;
}

function generateFontSize() {
    var fontSize = document.getElementById('fontSizeRange').value;
    var fontValue = document.getElementById('fontSizeValue');
    fontValue.value = fontSize;

    var textBlock = document.querySelector('#fontBlock .textExample');
    textBlock.style.fontSize = `${fontSize}px`;

    var cssCode = `.textExample {\n  font-size: ${fontSize}px;\n}`;
    document.getElementById('cssCodeFontSize').value = cssCode;
}