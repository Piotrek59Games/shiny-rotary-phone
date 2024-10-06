const komorki = document.querySelectorAll(".komorka");
const statusText = document.querySelector("#statusGry");
const resetGry = document.querySelector("#resetGry")
const warunkiWygranej =[
    [0, 1, 2],
    [3, 4, 5],    
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let opcje = ["", "", "", "", "", "", "", "", ""];
let obecnyGracz = "X";
let uruchomiona = false;

uruchomGre();

function uruchomGre()
{
    komorki.forEach(komorka => komorka.addEventListener("click", komorkaKliknieta))
    resetGry.addEventListener("click", zresetujGre);
    statusGry.textContent = `Tura ${obecnyGracz}`;
    uruchomiona = true;
}

function komorkaKliknieta()
{
    const indeksKomorki = this.getAttribute("indeksKomorki");

    if(opcje[indeksKomorki] != "" || !uruchomiona)
    {
        return;
    }

    zaktualizujKomorke(this, indeksKomorki)
    sprawdzZwyciestwo();
}

function zaktualizujKomorke(komorka, indeks)
{
    opcje[indeks] = obecnyGracz;
    komorka.textContent = obecnyGracz;
}

function zmienGracza()
{
    obecnyGracz = (obecnyGracz == "X") ? "O" : "X";
    statusGry.textContent = `Tura ${obecnyGracz}`;
}

function sprawdzZwyciestwo()
{
    let rundaWygrana = false;

    for(let i = 0; i < warunkiWygranej.length; i++)
    {
        const warunek = warunkiWygranej[i];
        const komorkaA = opcje[warunek[0]];
        const komorkaB = opcje[warunek[1]];
        const komorkaC = opcje[warunek[2]];

        if(komorkaA == "" || komorkaB == "" || komorkaC == "")
        {
            continue;
        }
        if(komorkaA == komorkaB && komorkaB == komorkaC)
        {
            rundaWygrana = true;
            break;
        }
    }

    if(rundaWygrana)
    {
        statusGry.textContent = `${obecnyGracz} wygrywa!`;
        uruchomiona = false;
    }
    else if(!opcje.includes(""))
    {
        statusGry.textContent = `Remis!`;
    }
    else{
        zmienGracza();
    }
}

function zresetujGre()
{
    obecnyGracz = "X";
    opcje = ["", "", "", "", "", "", "", "", ""];
    statusGry.textContent = `Tura ${obecnyGracz}`;
    komorki.forEach(komorka => komorka.textContent = "");
    uruchomiona = true;
}