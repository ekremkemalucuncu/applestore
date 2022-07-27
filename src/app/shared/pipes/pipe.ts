import { Pipe, PipeTransform } from "@angular/core";



@Pipe({name:'textslice'})
export class TextSlice implements PipeTransform{
    transform(text:string,which:number) {
        return text?.slice(0,which)
    }
}
