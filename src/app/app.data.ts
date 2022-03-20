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
            { id:  1, kamoku: '出:水道光熱費',kbn:"出"},
            { id:  2, kamoku: '出:通信料',kbn:"出" },
            { id:  3, kamoku: '出:習い事',kbn:"出" },
            { id:  4, kamoku: '出:交通費',kbn:"出"},
            { id:  5, kamoku: '出:食費',kbn:"出" },
            { id:  6, kamoku: '出:外食費' ,kbn:"出"},
            { id:  7, kamoku: '出:日用品費' ,kbn:"出"},
            { id:  8, kamoku: '出:医療費' ,kbn:"出"},
            { id:  9, kamoku: '出:トリニータ',kbn:"出" },
            { id: 10, kamoku: '出:交際費',kbn:"出" },
            { id: 11, kamoku: '出:娯楽費',kbn:"出" },
            { id: 12, kamoku: '出:口座' ,kbn:"出"},
            { id: 13, kamoku: '入:入金',kbn:"入" },
            { id: 14, kamoku: '残:残高',kbn:"残" },
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
