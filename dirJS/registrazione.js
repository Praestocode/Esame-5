class CampiObbligatori {
    static verificaCampiObbligatori(dati) {
        // Nascondo tutti i messaggi di errore all'inizio
        CampiObbligatori.nascondiMessaggiErrore();
        CampiObbligatori.nascondiMessaggiErrore2();
        let campiCompilati = true;
        let campiCorretti = true;
        // regex di controllo
        const codiceFiscaleRegex = /^[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]$/;
        const controlloInputTesto = /^[A-Za-z\s]{2,40}$/;
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
        // controllo nome
        if (!dati.nome.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningNome');
            campiCompilati = false;
        }
        else if (!controlloInputTesto.test(dati.nome)) {
            CampiObbligatori.mostraMessaggioErrore2('warningNome');
            campiCorretti = false;
        }
        // controllo cognome           
        if (!dati.cognome.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningCognome');
            campiCompilati = false;
        }
        else if (!controlloInputTesto.test(dati.cognome)) {
            CampiObbligatori.mostraMessaggioErrore2('warningCognome');
            campiCorretti = false;
        }
        // controllo sesso
        if (!dati.sesso.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningSesso');
            campiCompilati = false;
        }
        // controllo codice fiscale
        if (!dati.codiceFiscale.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningCodiceFiscale');
            campiCompilati = false;
        }
        else if (!codiceFiscaleRegex.test(dati.codiceFiscale)) {
            CampiObbligatori.mostraMessaggioErrore2('warningCodiceFiscale');
            campiCorretti = false;
        }
        // controllo cittadinanza
        if (!dati.cittadinanza.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningCittadinanza');
            campiCompilati = false;
        }
        // controllo nazione
        if (!dati.nazioneNascita.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningNazione');
            campiCompilati = false;
        }
        // controllo città
        if (!dati.cittaNascita.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningCitta');
            campiCompilati = false;
        }
        // controllo provincia
        if (!dati.provinciaNascita.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningProvincia');
            campiCompilati = false;
        }
        else if (!controlloInputTesto.test(dati.provinciaNascita)) {
            CampiObbligatori.mostraMessaggioErrore2('warningProvincia');
            campiCorretti = false;
        }
        // controllo data di nascita
        if (!dati.dataNascita.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningDataNascita');
            campiCompilati = false;
        }
        // controllo password 1
        const ScegliPassword = document.getElementById('ScegliPassword').value;
        if (!ScegliPassword.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningScegliPassword');
            campiCompilati = false;
        }
        else if (!passwordRegex.test(ScegliPassword)) {
            // Password non rispetta i criteri
            CampiObbligatori.mostraMessaggioErrorePsw2('warningScegliPassword');
            campiCorretti = false;
        }
        // controllo password 2        
        if (!dati.password.trim()) {
            CampiObbligatori.mostraMessaggioErrore('warningConfermaPassword');
            campiCompilati = false;
        }
        else if (dati.password !== ScegliPassword) {
            CampiObbligatori.mostraMessaggioErrorePsw('warningConfermaPassword');
            campiCorretti = false;
        }
        return [campiCompilati, campiCorretti];
    }
    static nascondiMessaggiErrore() {
        const warningElements = document.querySelectorAll('.warning');
        warningElements.forEach((element) => {
            element.style.display = 'none';
        });
    }
    static mostraMessaggioErrore(id) {
        const warningElement = document.getElementById(id);
        if (warningElement) {
            warningElement.style.display = 'block';
        }
    }
    static nascondiMessaggioErrore(id) {
        const warningElement = document.getElementById(id);
        if (warningElement) {
            warningElement.style.display = 'none';
        }
    }
    // Gestione messaggi altri casi
    static nascondiMessaggiErrore2() {
        const warningElements = document.querySelectorAll('.warning');
        warningElements.forEach((element) => {
            element.style.display = 'none';
        });
    }
    static mostraMessaggioErrore2(id) {
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
    static nascondiMessaggioErrore2(id) {
        const warningElement = document.getElementById(id);
        if (warningElement) {
            warningElement.style.display = 'none';
        }
    }
    // Gestione messaggi errore Password 1
    static nascondiMessaggiErrorePsw() {
        const warningElements = document.querySelectorAll('.warning');
        warningElements.forEach((element) => {
            element.style.display = 'none';
        });
    }
    static mostraMessaggioErrorePsw(id) {
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
    static nascondiMessaggioErrorePsw(id) {
        const warningElement = document.getElementById(id);
        if (warningElement) {
            warningElement.style.display = 'none';
        }
    }
    // Gestione messaggi errore Password 2
    static nascondiMessaggiErrorePsw2() {
        const warningElements = document.querySelectorAll('.warning');
        warningElements.forEach((element) => {
            element.style.display = 'none';
        });
    }
    static mostraMessaggioErrorePsw2(id) {
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
    static nascondiMessaggioErrorePsw2(id) {
        const warningElement = document.getElementById(id);
        if (warningElement) {
            warningElement.style.display = 'none';
        }
    }
}
class Registrazione {
    static registra(newData) {
        const endpoint = 'http://localhost:8000/api/v1/registrazione/';
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'inline-block';
        // Stampo dati in console
        console.log('Dati del contatto da inviare al backend:', newData);
        return fetch(endpoint, {
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
        })
            .catch(error => {
            console.error('Errore nell\'aggiunta del contatto:', error);
            throw error;
        });
    }
}
// Ascoltatore per l'evento di invio del modulo
document.getElementById('formRegister').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita il comportamento predefinito di submit
    // Dichiarazione e inizializzazione del flag per indicare se è stato rilevato un errore
    let errorDetected = false;
    // Ottiengo i valori dei campi del modulo
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
    // Oggetto con i dati del contatto
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
    // Verifico se il campo partitaIva non è vuoto
    if (partitaIva.trim() !== '') {
        const partitaIvaCleaned = partitaIva.trim(); // Rimuove gli spazi bianchi
        // Verifico se la stringa contiene esattamente 11 cifre numeriche
        if (/^\d{11}$/.test(partitaIvaCleaned)) {
            nuovoContatto.partitaIva = partitaIvaCleaned; // Assegnp la partitaIva all'oggetto nuovoContatto
        }
        else {
            // Non invio i dati al server se il campo partitaIva è stato compilato ma non è valido
            errorDetected = true; // Imposta il flag per indicare che si è verificato un errore
            // Mostra l'elemento di avviso sull'HTML
            const warningElement = document.getElementById('warningPartitaIva');
            warningElement.style.display = 'inline-block';
        }
    }
    // Procedo con la verifica dei campi obbligatori solo se non è stato rilevato un errore nel campo partitaIva
    if (!errorDetected) {
        const [campiCompilati, campiCorretti] = CampiObbligatori.verificaCampiObbligatori(nuovoContatto);
        if (campiCompilati && campiCorretti) {
            // Chiamo il metodo di registrazione della classe
            Registrazione.registra(nuovoContatto)
                .then(() => {
                console.log('Nuovo contatto aggiunto con successo');
                window.location.href = 'index.html';
            })
                .catch(error => {
                console.error('Errore nell\'aggiunta del contatto:', error);
            });
        }
        else {
            console.error('Alcuni campi non sono compilati correttamente o non sono stati compilati tutti i campi obbligatori.');
        }
    }
    else {
        CampiObbligatori.verificaCampiObbligatori(nuovoContatto);
        const warningElement = document.getElementById('warningPartitaIva');
        warningElement.style.display = 'inline-block';
    }
});
