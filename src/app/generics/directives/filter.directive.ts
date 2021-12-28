import {
    Directive,
    Renderer2,
    OnInit,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges
  } from '@angular/core';
  
  @Directive({
    selector: '[filterShop]'
  })
  export class FilterShopDirective implements OnInit, OnChanges {
    @Input() currentValue: string[] | string | any;
    @Input() objValue: string[] | string | any;
  
    private type = null;

    constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  
    ngOnInit() {
        this.type = typeof(this.currentValue);
        this.checkValue()
    }
  
    ngOnChanges(changes: SimpleChanges){
        this.checkValue()
    }

    checkValue(){
        if(this.type === "string"){
            if(this.currentValue === 'Any' || this.currentValue === this.objValue){
                this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
            } else {
                this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
            }
       } else {
           let checkStatus = this.currentValue.map((elem, i) => {
               if(elem === 'Any'){
                   return true
               } else {
                   return elem === this.objValue[i]
               }
           })
        let check = true;
          for(let i=0 ; i < checkStatus.length ; i++){
              if(!checkStatus[i]){
                check= false
              }
          }
          if(check){
            this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
          }else{
            this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
          }
       }
    }
  }
  