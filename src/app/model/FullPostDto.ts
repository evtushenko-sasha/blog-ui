import {ShortUserDto} from './ShortUserDto';
import {Tag} from './Tag';

export interface FullPostDto {
  id: number;
  title: string;
  text: string;
  creationTime: Date;
  user: ShortUserDto;
  tags: Tag[];
  karma: number;
  countBookmarks: number;
  countViews: number;
  countComments: number;
  imageUrl: string;
  bookmarked: boolean;
//    TODO: decide about the necessary of this field + recommendations for
//  comments: Comment[];
}
