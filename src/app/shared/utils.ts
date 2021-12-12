export class Utils {
    static dateToString(d: Date | null)
    {
        if(d)
        {
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            let year = d.getFullYear();
        
            if (month.length < 2) {
            month = '0' + month;
            }
            if (day.length < 2) {
            day = '0' + day;
            }
            return [month, day, year].join('/');
        }
        return null;
    }

    static dateToString_DDMMYYYY(d: Date | null)
    {
        if(d)
        {
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            let year = d.getFullYear();
        
            if (month.length < 2) {
            month = '0' + month;
            }
            if (day.length < 2) {
            day = '0' + day;
            }
            return [day, month, year].join('/');
        }
        return null;
    }

    static isNumeric(val: unknown): val is string | number {
        return (
          !isNaN(Number(Number.parseFloat(String(val)))) &&
          isFinite(Number(val))
        );
    }

    static compareDate(d1: Date, d2: Date): number
    {
        if (d1.getTime() === d2.getTime()) return 0;
        else if (d1.getTime() > d2.getTime()) return -1;
        else return 1;
    }
}