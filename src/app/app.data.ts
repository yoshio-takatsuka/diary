import { Injectable } from '@angular/core';
//
export type KamokuItem = {
    id: number;
    kamoku: string;
    kbn: string;
}
export type KouzaItem = {
    id: number;
    kouza: string;
}

//
@Injectable()
export class DataService {
    getKamokuData() {
        return <KamokuItem[]>[
            { id:  1, kamoku: '01:水道光熱費',kbn:"出金"  },
            { id:  2, kamoku: '02:通信料',kbn:"出金" },
            { id:  3, kamoku: '03:習い事',kbn:"出金" },
            { id:  4, kamoku: '04:交通費',kbn:"出金"},
            { id:  5, kamoku: '05:食費',kbn:"出金" },
            { id:  6, kamoku: '06:外食費' ,kbn:"出金"},
            { id:  7, kamoku: '07:日用品費' ,kbn:"出金"},
            { id:  8, kamoku: '08:医療費' ,kbn:"出金"},
            { id:  9, kamoku: '09:トリニータ',kbn:"出金" },
            { id: 10, kamoku: '10:交際費',kbn:"出金" },
            { id: 11, kamoku: '11:娯楽費',kbn:"出金" },
            { id: 12, kamoku: '12:口座' ,kbn:"出金"},
            { id: 13, kamoku: '13:入金',kbn:"入金" },
        ];
    }
    getKouzaData() {
        return <KouzaItem[]>[
            { id: 1, kouza: '現金' },
            { id: 2, kouza: 'WAON'},
            { id: 3, kouza: 'Suica'},
            { id: 4, kouza: 'JCB'},
            { id: 5, kouza: 'Paypay'},
            { id: 7, kouza: 'Paypay銀行'},
            { id: 8, kouza: '三井住友銀行'},
            { id: 9, kouza: '郵便局'},

        ];
    }
}
