import {ShortPostDto} from './ShortPostDto';

export interface FullUserDto {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  imageUrl: string;
  description: string;

  /*TODO: add other fields, see at habr (https://habr.com/ru/users/vkomen/) for mode details =)*/
}
