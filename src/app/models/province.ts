
    export interface Zona {
        codice: string;
        nome: string;
    }

    export interface Regione {
        codice: string;
        nome: string;
    }

    export interface Provincia {
        codice: string;
        nome: string;
    }

    export interface Cities {
        nome: string;
        codice: string;
        zona: Zona;
        regione: Regione;
        provincia: Provincia;
        sigla: string;
        codiceCatastale: string;
        cap: string[];
        popolazione: number;
    }


