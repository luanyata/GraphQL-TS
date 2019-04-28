import {ModelsInterface} from "./ModelsInterface";

export interface BaseModalInterface {
    prototype?;

    associate?(models: ModelsInterface): void
}