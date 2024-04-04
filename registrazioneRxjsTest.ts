import { Observable, Observer } from "rxjs";

// Interfaccia per rappresentare un contatto
interface Contatto {
    nome: string;
    cognome: string;
    sesso: string;
    codiceFiscale: string;
    partitaIva?: string;
    cittadinanza: string;
    nazioneNascita: string;
    cittaNascita: string;
    provinciaNascita: string;
    dataNascita: string;
    password: string;
}

// Funzione per verificare i campi obbligatori
function verificaCampiObbligatori(dati: Contatto): Observable<[boolean, boolean]> {
    const codiceFiscaleRegex = /^[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]$/;
    const controlloInputTesto = /^[A-Za-z\s]{2,40}$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

    return new Observable((observer: Observer<[boolean, boolean]>) => {
        let campiCompilati = true;
        let campiCorretti = true;

        // Verifica campi obbligatori
        if (!dati.nome.trim() || !controlloInputTesto.test(dati.nome)) {
            campiCompilati = false;
        }
        if (!dati.cognome.trim() || !controlloInputTesto.test(dati.cognome)) {
            campiCompilati = false;
        }
        if (!dati.sesso.trim()) {
            campiCompilati = false;
        }
        if (!dati.codiceFiscale.trim() || !codiceFiscaleRegex.test(dati.codiceFiscale)) {
            campiCompilati = false;
        }
        if (!dati.cittadinanza.trim()) {
            campiCompilati = false;
        }
        if (!dati.nazioneNascita.trim()) {
            campiCompilati = false;
        }
        if (!dati.cittaNascita.trim()) {
            campiCompilati = false;
        }
        if (!dati.provinciaNascita.trim() || !controlloInputTesto.test(dati.provinciaNascita)) {
            campiCompilati = false;
        }
        if (!dati.dataNascita.trim()) {
            campiCompilati = false;
        }

        const ScegliPassword = dati.password;

        if (!ScegliPassword.trim() || !passwordRegex.test(ScegliPassword)) {
            campiCompilati = false;
        }

        observer.next([campiCompilati, campiCorretti]);
        observer.complete();
    });
}

// Classe per la registrazione del contatto
class Registrazione {
    static registra(newData: Contatto): Observable<void> {
        const endpoint = 'http://localhost:8000/api/v1/registrazione/';

        return new Observable((observer: Observer<void>) => {
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

// Modello di contatto per testare
const nuovoContatto: Contatto = {
    nome: 'Virgilio',
    cognome: 'Polini',
    sesso: 'Maschio',
    codiceFiscale: 'MRORSI97R10H769O',
    cittadinanza: 'Italiana',
    nazioneNascita: 'Italia',
    cittaNascita: 'San Benedetto del Tronto',
    provinciaNascita: 'Ascoli Piceno',
    dataNascita: '10-10-1997',
    password: 'password12@!'
};

// Verifica dei campi obbligatori e registrazione del contatto
verificaCampiObbligatori(nuovoContatto).subscribe({
    next: ([campiCompilati, campiCorretti]) => {
        if (campiCompilati && campiCorretti) {
            Registrazione.registra(nuovoContatto).subscribe({
                next: () => {
                    console.log(nuovoContatto);
                    console.log('Nuovo contatto aggiunto con successo');
                },
                error: (error) => {
                    console.error('Errore durante la registrazione del contatto:', error);
                }
            });
        } else {
            console.error('Alcuni campi non sono compilati correttamente o non sono stati compilati tutti i campi obbligatori.');
        }
    },
    error: (error) => {
        console.error('Errore durante la verifica dei campi obbligatori:', error);
    }
});
