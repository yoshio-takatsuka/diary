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
            { id: 1, kamoku: '水道光熱費',kbn:"出金"  },
            { id: 2, kamoku: '通信料',kbn:"出金" },
            { id: 3, kamoku: '習い事',kbn:"出金" },
            { id: 4, kamoku: '交通費',kbn:"出金"},
            { id: 5, kamoku: '食費',kbn:"出金" },
            { id: 6, kamoku: '外食費' ,kbn:"出金"},
            { id: 7, kamoku: '日用品費' ,kbn:"出金"},
            { id: 8, kamoku: '医療費' ,kbn:"出金"},
            { id: 9, kamoku: 'トリニータ',kbn:"出金" },
            { id: 10, kamoku: '交際費',kbn:"出金" },
            { id: 11, kamoku: '娯楽費',kbn:"出金" },
            { id: 12, kamoku: '口座' ,kbn:"出金"},
            { id: 13, kamoku: '入金',kbn:"入金" },
        ];
    }
    getKouzaData() {
        return <KouzaItem[]>[
            { id: 1, kouza: '現金' },
            { id: 2, kouza: 'WAON'},
            { id: 3, kouza: 'Suica'},
        ];
    }
}
