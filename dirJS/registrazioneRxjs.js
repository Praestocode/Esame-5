import { fromEvent, Observable } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
// Funzione per verificare i campi obbligatori
function verificaCampiObbligatori(dati) {
    // Nascondi tutti i messaggi di errore all'inizio
    nascondiMessaggiErrore();
    nascondiMessaggiErrore2();
    const codiceFiscaleRegex = /^[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]$/;
    const controlloInputTesto = /^[A-Za-z\s]{2,40}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    return new Observable((observer) => {
        let campiCompilati = true;
        let campiCorretti = true;
        // Verifica campi obbligatori
        if (!dati.nome.trim()) {
            mostraMessaggioErrore('warningNome');
            campiCompilati = false;
        }
        else if (!controlloInputTesto.test(dati.nome)) {
            mostraMessaggioErrore('warningNome');
            campiCorretti = false;
        }
        // controllo cognome           
        if (!dati.cognome.trim()) {
            mostraMessaggioErrore('warningCognome');
            campiCompilati = false;
        }
        else if (!controlloInputTesto.test(dati.cognome)) {
            mostraMessaggioErrore2('warningCognome');
            campiCorretti = false;
        }
        // controllo sesso
        if (!dati.sesso.trim()) {
            mostraMessaggioErrore('warningSesso');
            campiCompilati = false;
        }
        // controllo codice fiscale
        if (!dati.codiceFiscale.trim()) {
            mostraMessaggioErrore('warningCodiceFiscale');
            campiCompilati = false;
        }
        else if (!codiceFiscaleRegex.test(dati.codiceFiscale)) {
            mostraMessaggioErrore2('warningCodiceFiscale');
            campiCorretti = false;
        }
        // controllo cittadinanza
        if (!dati.cittadinanza.trim()) {
            mostraMessaggioErrore('warningCittadinanza');
            campiCompilati = false;
        }
        // controllo nazione
        if (!dati.nazioneNascita.trim()) {
            mostraMessaggioErrore('warningNazione');
            campiCompilati = false;
        }
        // controllo città
        if (!dati.cittaNascita.trim()) {
            mostraMessaggioErrore('warningCitta');
            campiCompilati = false;
        }
        // controllo provincia
        if (!dati.provinciaNascita.trim()) {
            mostraMessaggioErrore('warningProvincia');
            campiCompilati = false;
        }
        else if (!controlloInputTesto.test(dati.provinciaNascita)) {
            mostraMessaggioErrore2('warningProvincia');
            campiCorretti = false;
        }
        // controllo data di nascita
        if (!dati.dataNascita.trim()) {
            mostraMessaggioErrore('warningDataNascita');
            campiCompilati = false;
        }
        // controllo password 1
        const ScegliPassword = document.getElementById('ScegliPassword').value;
        if (!ScegliPassword.trim()) {
            mostraMessaggioErrore('warningScegliPassword');
            campiCompilati = false;
        }
        else if (!passwordRegex.test(ScegliPassword)) {
            // Password non rispetta i criteri
            mostraMessaggioErrorePsw2('warningScegliPassword');
            campiCorretti = false;
        }
        // controllo password 2        
        if (!dati.password.trim()) {
            mostraMessaggioErrore('warningConfermaPassword');
            campiCompilati = false;
        }
        else if (dati.password !== ScegliPassword) {
            mostraMessaggioErrorePsw('warningConfermaPassword');
            campiCorretti = false;
        }
        // Altre verifiche dei campi obbligatori
        observer.next([campiCompilati, campiCorretti]);
        observer.complete();
    });
}
// Funzione per nascondere i messaggi di errore
function nascondiMessaggiErrore() {
    const warningElements = document.querySelectorAll('.warning');
    warningElements.forEach((element) => {
        element.style.display = 'none';
    });
}
// Funzione per mostrare un messaggio di errore
function mostraMessaggioErrore(id) {
    const warningElement = document.getElementById(id);
    if (warningElement) {
        warningElement.style.display = 'block';
    }
}
// Funzione per nascondere un messaggio di errore
function nascondiMessaggioErrore(id) {
    const warningElement = document.getElementById(id);
    if (warningElement) {
        warningElement.style.display = 'none';
    }
}
// Gestione messaggi altri casi
function nascondiMessaggiErrore2() {
    const warningElements = document.querySelectorAll('.warning');
    warningElements.forEach((element) => {
        element.style.display = 'none';
    });
}
function mostraMessaggioErrore2(id) {
    const warningElement = document.getElementById(id);
    if (warningElement) {
        warningElement.innerHTML = `
            <span class="text-danger">Campo non valido</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>`;
        warningElement.style.display = 'block';
    }
}
function nascondiMessaggioErrore2(id) {
    const warningElement = document.getElementById(id);
    if (warningElement) {
        warningElement.style.display = 'none';
    }
}
// Gestione messaggi errore Password 1
function nascondiMessaggiErrorePsw() {
    const warningElements = document.querySelectorAll('.warning');
    warningElements.forEach((element) => {
        element.style.display = 'none';
    });
}
function mostraMessaggioErrorePsw(id) {
    const warningElement = document.getElementById(id);
    if (warningElement) {
        warningElement.innerHTML = `
            <span class="text-danger">Password errata</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>`;
        warningElement.style.display = 'block';
    }
}
function nascondiMessaggioErrorePsw(id) {
    const warningElement = document.getElementById(id);
    if (warningElement) {
        warningElement.style.display = 'none';
    }
}
// Gestione messaggi errore Password 2
function nascondiMessaggiErrorePsw2() {
    const warningElements = document.querySelectorAll('.warning');
    warningElements.forEach((element) => {
        element.style.display = 'none';
    });
}
function mostraMessaggioErrorePsw2(id) {
    const warningElement = document.getElementById(id);
    if (warningElement) {
        warningElement.innerHTML = `
            <span class="text-danger">Password non valida</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>`;
        warningElement.style.display = 'block';
    }
}
function nascondiMessaggioErrorePsw2(id) {
    const warningElement = document.getElementById(id);
    if (warningElement) {
        warningElement.style.display = 'none';
    }
}
///// FINE MESSAGGI ERRORI
// Classe per la registrazione del contatto
class Registrazione {
    static registra(newData) {
        const endpoint = 'http://localhost:8000/api/v1/registrazione/';
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'inline-block';
        console.log('Dati del contatto da inviare al backend:', newData);
        return new Observable((observer) => {
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData)
            })
                .then(response => {
                if (!response.ok) {
                    throw new Error('Errore nell\'aggiunta del contatto');
                }
                observer.next();
                observer.complete();
            })
                .catch(error => {
                console.error('Errore nell\'aggiunta del contatto:', error);
                observer.error(error);
            });
        });
    }
}
// Observable per l'evento di invio del modulo
const submitEvent$ = fromEvent(document.getElementById('formRegister'), 'submit');
submitEvent$.pipe(map((event) => {
    event.preventDefault(); // Evita comportamento predefinito di submit
    // Dichiarazione e inizializzazione del flag per indicare se è stato rilevato un errore
    let errorDetected = false;
    // Ottengo i valori dei campi del modulo
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const sesso = document.getElementById('sesso').value;
    const codiceFiscale = document.getElementById('codiceFiscale').value;
    const partitaIva = document.getElementById('partitaIva').value;
    const cittadinanza = document.getElementById('cittadinanza').value;
    const nazioneNascita = document.getElementById('countrySelect').value;
    const cittaNascita = document.getElementById('citySelect').value;
    const provinciaNascita = document.getElementById('provincia').value;
    const dataNascitaInput = document.getElementById('dateStandard').value;
    const password = document.getElementById('password').value;
    // Divido la data in anno, mese e giorno
    const [anno, mese, giorno] = dataNascitaInput.split('-');
    // Verifico se sono stati inseriti tutti i componenti della data
    const dataNascita = (anno && mese && giorno) ? `${giorno}-${mese}-${anno}` : '';
    // Oggetto contatto
    const nuovoContatto = {
        nome: nome,
        cognome: cognome,
        sesso: sesso,
        codiceFiscale: codiceFiscale,
        //partitaIva: partitaIva,
        cittadinanza: cittadinanza,
        nazioneNascita: nazioneNascita,
        cittaNascita: cittaNascita,
        provinciaNascita: provinciaNascita,
        dataNascita: dataNascita,
        password: password
    };
    return nuovoContatto;
}), mergeMap((nuovoContatto) => verificaCampiObbligatori(nuovoContatto).pipe(map(([campiCompilati, campiCorretti]) => ({ campiCompilati, campiCorretti, nuovoContatto })))), catchError(error => {
    console.error('Errore durante la verifica dei campi obbligatori:', error);
    return new Observable();
}), mergeMap(({ campiCompilati, campiCorretti, nuovoContatto }) => {
    if (campiCompilati && campiCorretti) {
        // Invio i dati al server
        console.log('Dati del contatto da inviare al backend:', nuovoContatto);
        return new Observable((observer) => {
            observer.next();
            observer.complete();
        });
    }
    else {
        console.error('Alcuni campi non sono compilati correttamente o non sono stati compilati tutti i campi obbligatori.');
        return new Observable();
    }
}));
