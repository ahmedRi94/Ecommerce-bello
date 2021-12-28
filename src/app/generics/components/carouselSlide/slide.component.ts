import { Component, Input, OnInit } from '@angular/core';
import { Slide } from 'src/app/interface/slide.interface';

@Component({
  selector: 'app-slide',
  template: `
  <div attr.id="{{carouselId}}" class="carousel slide">
    <div class="carousel-indicators">
        <button *ngFor="let slide of slides;index as i" (click)="selectSlide(i)" type="button" attr.data-bs-target="{{'#' + carouselId}}" attr.data-slide-to="{{i}}" [ngClass]="{'active': i == currentIndex}" attr.aria-label="'Slide {{i}}'" attr.aria-current="{{i == currentIndex}}"></button>
    </div>

    <div class="carousel-inner">
    <ng-container *ngFor="let slide of slides; index as i;">
        <div [ngClass]="{'active': i == currentIndex}" class="carousel-item">
          <img src="{{slide.img}}" alt="">
          <article class="container">
            <div class="carousel-caption text-start">
              <h1>{{slide.title}}</h1>
              <p>{{slide.description}}</p>

            </div>
          </article>
        </div>
        </ng-container>
    </div>

    <button class="carousel-control-prev" type="button" attr.data-bs-target="{{'#' + carouselId}}" data-bs-slide="prev" (click)="carouselSlide('prev')">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
    <button class="carousel-control-next" type="button" attr.data-bs-target="{{'#' + carouselId}}" data-bs-slide="next" (click)="carouselSlide('next')">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
</div>`,
  styles: ['']
})
export class SlideComponent implements OnInit {

  @Input() slides: Slide[] = [{
    title: '',
    description: '',
    img: ''
  }];

  @Input() carouselId: string;

  currentIndex = 0;
  interval: any;

  constructor() {
    this.startInterval()
  }

  selectSlide(i: number) {
    clearInterval(this.interval);
    this.currentIndex = i;
    this.startInterval()
  }

  startInterval() {
    this.interval = setInterval(() => {
      if (this.currentIndex === this.slides.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++
      }
    }, 5000)
  }

  carouselSlide(s: string) {
    clearInterval(this.interval);
      if (s === 'prev') {
        if (this.currentIndex === 0) {
          this.currentIndex = this.slides.length - 1;
        } else {
          this.currentIndex--
        }
      } else {
        if (this.currentIndex === this.slides.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex++
        }
      }
      this.startInterval()
  }
  ngOnInit(): void {

  }
}


