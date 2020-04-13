import {ShortUserDto} from './ShortUserDto';
import {Tag} from './Tag';

export interface ShortPostDto {
  id: number;
  title: string;
  description: string;
  creationTime: Date;
  user: ShortUserDto;
  tags: Tag[];
  karma: number;
  countBookmarks: number;
  countViews: number;
  countComments: number;
  imageUrl: string;
}
