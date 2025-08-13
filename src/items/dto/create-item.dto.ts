import { CreateListingDto } from './create-listing.dto';
import { CreateTag } from './create-tag.dto';

export class CreateItemDto {
  name: string;
  public?: boolean;
  listing: CreateListingDto;
  comments: string[];
  tags: CreateTag[];
}
