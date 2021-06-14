import {Component} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import {Observable, of} from 'rxjs';
import {FullUserDto} from "../../model/FullUserDto";
import {PostService} from "../../service/post.service";
import {CommentService} from "../../service/comment.service";
import {ShortPostDto} from "../../model/ShortPostDto";
import {Comment} from '../../model/Comment';


@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    profileImage;

    currentUser: Observable<FullUserDto>;
    postOpen: boolean;
    commentOpen: boolean;
    posts: ShortPostDto[];
    comments: Comment[];


    constructor(private alertController: AlertController,
                private camera: Camera,
                private postService: PostService,
                private commentService: CommentService) {
        this.currentUser = of({
            id: 9,
            firstName: 'Valik',
            lastName: 'RUVDS.com',
            imageUrl: 'https://habrastorage.org/getpro/habr/avatars/f8e/004/d87/f8e004d878b0e35c2defaaca5386ae70.png',
            login: 'ValikRUVDS.com',
            description: 'Соучредитель WIT Company (wit.ru)\n' +
                'Интересы — математика, программирование, теорфизика, лингвистика'

        } as FullUserDto);
        this.posts = postService.getPostsByUserId(9);
        this.comments = commentService.getCommentByUserId(9);
        console.log(this.comments.length);
    }

    toggleSelectComment() {
        this.commentOpen = !this.commentOpen;
    }

    toggleSelectPost() {
        this.postOpen = !this.postOpen;
    }

    async selectImageSource() {
        const alert = await this.alertController.create({
            header: 'Select Source',
            message: 'Pick a source for your image',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => {
                        this.setPictureBySourceTypeName(PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Gallery',
                    handler: () => {
                        this.setPictureBySourceTypeName(PictureSourceType.PHOTOLIBRARY);
                    }
                }
            ]
        });
        await alert.present();
    }

    async setPictureBySourceTypeName(pictureSourceType: PictureSourceType) {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetHeight: 200,
            correctOrientation: true,
            sourceType: pictureSourceType
        };
        this.camera.getPicture(options)
            .then((image) => {
                this.profileImage = 'data:image/jpeg;base64,' + image;
                //  TODO: send put request to update photo by userDetails
            });
    }
}
