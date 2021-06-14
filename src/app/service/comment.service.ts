import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Comment} from '../model/Comment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private httpClient: HttpClient) {
    }

    comments: Comment[] = [
        {
            id: 1,
            postId: 1,
            text: 'some comment1',
            creationTime: new Date('December 18, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 9,
                firstName: 'Valik',
                lastName: 'RUVDS.com',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'ValikRUVDS.com'
            }
        },
        {
            id: 2,
            postId: 1,
            text: 'some comment2',
            creationTime: new Date('December 18, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 2,
                firstName: 'Deluar',
                lastName: 'Vachenko',
                imageUrl: 'https://cdn.profile.ru/wp-content/uploads/2020/03/shutterstock_754674145.jpg',
                login: 'Deluar'
            }
        },
        {
            id: 3,
            postId: 2,
            text: 'some comment1',
            creationTime: new Date('December 18, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 3,
                firstName: 'ALex',
                lastName: 'Selectel',
                imageUrl: 'https://www.passion.ru/thumb/0x600/filters:quality(75)/imgs/2017/05/12/14/787219/76c0f20dcf1a80a446674ec6677a681084ff2b38.jpg',
                login: 'ALexSelectel'
            }
        },
        {
            id: 4,
            postId: 2,
            text: 'some comment2',
            creationTime: new Date('December 18, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 3,
                firstName: 'ALex',
                lastName: 'Selectel',
                imageUrl: 'https://www.passion.ru/thumb/0x600/filters:quality(75)/imgs/2017/05/12/14/787219/76c0f20dcf1a80a446674ec6677a681084ff2b38.jpg',
                login: 'ALexSelectel'
            }
        },
        {
            id: 5,
            postId: 2,
            text: 'some comment3',
            creationTime: new Date('December 18, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 1,
                firstName: 'Oleg',
                lastName: 'Sivchenko',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/27b/f35/f6f/27bf35f6f595fc136b70c384752ba387.jpg',
                login: 'OlegSivchenko'
            }
        },
        {
            id: 6,
            postId: 2,
            text: 'some comment4',
            creationTime: new Date('December 18, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 1,
                firstName: 'Oleg',
                lastName: 'Sivchenko',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/27b/f35/f6f/27bf35f6f595fc136b70c384752ba387.jpg',
                login: 'OlegSivchenko'
            }
        },
        {
            id: 7,
            postId: 3,
            text: 'some comment1',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 9,
                firstName: 'Valik',
                lastName: 'RUVDS.com',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'ValikRUVDS.com'
            }
        },
        {
            id: 8,
            postId: 3,
            text: 'some comment2',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 5,
                firstName: 'Companu',
                lastName: 'VDSina.ru',
                imageUrl: 'https://habrastorage.org/getpro/habr/company/349/b75/e68/349b75e680748f727261c7de1a4e1c5f.png',
                login: 'VDSina.ru'
            }
        },
        {
            id: 9,
            postId: 3,
            text: 'some comment3',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 5,
                firstName: 'Companu',
                lastName: 'VDSina.ru',
                imageUrl: 'https://habrastorage.org/getpro/habr/company/349/b75/e68/349b75e680748f727261c7de1a4e1c5f.png',
                login: 'VDSina.ru'
            }
        },
        {
            id: 10,
            postId: 3,
            text: 'some comment4',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 5,
                firstName: 'Companu',
                lastName: 'VDSina.ru',
                imageUrl: 'https://habrastorage.org/getpro/habr/company/349/b75/e68/349b75e680748f727261c7de1a4e1c5f.png',
                login: 'VDSina.ru'
            }
        },
        {
            id: 11,
            postId: 3,
            text: 'some comment5',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 5,
                firstName: 'Companu',
                lastName: 'VDSina.ru',
                imageUrl: 'https://habrastorage.org/getpro/habr/company/349/b75/e68/349b75e680748f727261c7de1a4e1c5f.png',
                login: 'VDSina.ru'
            }
        },
        {
            id: 12,
            postId: 3,
            text: 'some comment6',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 5,
                firstName: 'Companu',
                lastName: 'VDSina.ru',
                imageUrl: 'https://habrastorage.org/getpro/habr/company/349/b75/e68/349b75e680748f727261c7de1a4e1c5f.png',
                login: 'VDSina.ru'
            }
        },
        {
            id: 13,
            postId: 3,
            text: 'some comment7',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 9,
                firstName: 'Valik',
                lastName: 'RUVDS.com',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'ValikRUVDS.com'
            }
        },
        {
            id: 14,
            postId: 3,
            text: 'some comment8',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 5,
                firstName: 'Companu',
                lastName: 'VDSina.ru',
                imageUrl: 'https://habrastorage.org/getpro/habr/company/349/b75/e68/349b75e680748f727261c7de1a4e1c5f.png',
                login: 'VDSina.ru'
            }
        },
        {
            id: 15,
            postId: 3,
            text: 'some comment9',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 6,
                firstName: 'Kislay',
                lastName: 'Verma',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'KislayVerma'
            }
        },
        {
            id: 16,
            postId: 3,
            text: 'some comment10',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 9,
                firstName: 'Valik',
                lastName: 'RUVDS.com',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'ValikRUVDS.com'
            }
        },
        {
            id: 17,
            postId: 3,
            text: 'some comment11',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 6,
                firstName: 'Kislay',
                lastName: 'Verma',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'KislayVerma'
            }
        },
        {
            id: 18,
            postId: 3,
            text: 'some comment12',
            creationTime: new Date('December 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 5,
                firstName: 'Companu',
                lastName: 'VDSina.ru',
                imageUrl: 'https://habrastorage.org/getpro/habr/company/349/b75/e68/349b75e680748f727261c7de1a4e1c5f.png',
                login: 'VDSina.ru'
            }
        },
        {
            id: 19,
            postId: 5,
            text: 'some comment1',
            creationTime: new Date('May 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 6,
                firstName: 'Kislay',
                lastName: 'Verma',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'KislayVerma'
            }
        },
        {
            id: 20,
            postId: 5,
            text: 'some comment2',
            creationTime: new Date('May 20, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 5,
                firstName: 'Companu',
                lastName: 'VDSina.ru',
                imageUrl: 'https://habrastorage.org/getpro/habr/company/349/b75/e68/349b75e680748f727261c7de1a4e1c5f.png',
                login: 'VDSina.ru'
            }
        },
        {
            id: 21,
            postId: 6,
            text: 'some new comment1',
            creationTime: new Date('May 29, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 9,
                firstName: 'Valik',
                lastName: 'RUVDS.com',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'ValikRUVDS.com'
            }
        },
        {
            id: 22,
            postId: 8,
            text: 'some a new comment1',
            creationTime: new Date('May 31, 2021 03:24:00'),
            karma: -1,
            parentId: null,
            user: {
                id: 9,
                firstName: 'Valik',
                lastName: 'RUVDS.com',
                imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
                login: 'ValikRUVDS.com'
            }
        },
    ];

    getCommentsByPostId(postId: number, page: number, size: number, sort: string, sortType: string): Observable<Comment[]> {

        return of(this.comments.filter(x => x.postId == postId).sort((a, b) => b[sort] - a[sort]));
    }

    addComment(comment: Comment): Promise<any> {
        return of(this.comments.push(comment)).toPromise();
    }

    getCommentByUserId(userId: number): Comment[] {
        return this.comments.filter(c => c.user.id == userId);
    }

    getSortTypes(): Observable<string[]> {
        return of(['karma', 'creationTime']);
    }

    deleteComment(id: number): Observable<any> {
        this.comments = this.comments.filter(x => x.id != id);
        return of(id);
    }
}
