import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Tag} from '../model/Tag';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private httpClient: HttpClient) {
    }

    tags: Tag[] = [{id: 1, title: 'Астрономия'}, {id: 2, title: 'Химия'},
        {id: 3, title: 'будущее'}, {id: 4, title: 'энергетика'},
        {id: 5, title: 'конструкции'}, {id: 6, title: 'алюминий'},
        {id: 7, title: 'solid'}, {id: 8, title: 'архитектурные паттерны'},
        {id: 9, title: 'uml'}, {id: 10, title: 'метки'},
        {id: 11, title: 'организация кода'},
        {id: 12, title: 'микроконтроллеры'}, {id: 13, title: 'linux'},
        {id: 13, title: 'работа в малом бизнесе'}, {id: 14, title: 'малый бизнес'},
        {id: 15, title: 'cable for power'}, {id: 16, title: 'питание'},
        {id: 17, title: 'Датчик филамента'}, {id: 18, title: '3d-печать'}
    ];

    getTags(): Observable<Tag[]> {
        return of(this.tags);
    }
}
