import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(value: any, filter: string, ...args: string[]): any {
    if(filter === null || filter === ''){
      return value
    }
    filter.toLowerCase();
    let tempArray:any = [], addElem: boolean;
    for(let item of value){
      addElem = false
      for(let props of args){
        let tempString = item[props];
        if(tempString.toLowerCase().includes(filter)){
          addElem = true
        }
      }
      if(addElem){
        tempArray.push(item);
      }
    }
    return tempArray;
  }
}
