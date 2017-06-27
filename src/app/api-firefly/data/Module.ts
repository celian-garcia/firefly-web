import {Type} from 'app/api-firefly/data/Type';

/**
 * Created by celia on 14/05/2017.
 */
export class Module {
    id: number;
    description: string;
    image_path: string;
    title: string;
    processing_types: Type[];
    version: string;
}