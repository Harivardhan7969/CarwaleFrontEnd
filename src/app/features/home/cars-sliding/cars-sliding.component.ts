import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cars-sliding',
  standalone: true,
  imports: [],
  templateUrl: './cars-sliding.component.html',
  styleUrl: './cars-sliding.component.css'
})
export class CarsSlidingComponent implements OnInit, AfterViewInit {

  private scrollAmount = 0;
  private scrollStep = 0;

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const slider = this.slider.nativeElement as HTMLElement;

    this.scrollStep = slider.clientWidth / 8;

    const leftButton = slider.parentElement?.querySelector('.left') as HTMLElement;
    const rightButton = slider.parentElement?.querySelector('.right') as HTMLElement;

    if (leftButton && rightButton) {
      leftButton.addEventListener('click', () => this.scrollSlider(-1));
      rightButton.addEventListener('click', () => this.scrollSlider(1));
    }

    setInterval(() => this.scrollSlider(1), 2000);
  }

  scrollSlider(direction: number): void {
    const slider = this.slider.nativeElement as HTMLElement;
    this.scrollAmount += direction * this.scrollStep;

    if (direction === 1 && this.scrollAmount >= slider.scrollWidth - slider.clientWidth) {

      this.scrollAmount = 0;
    } else if (direction === -1 && this.scrollAmount < 0) {

      this.scrollAmount = slider.scrollWidth - slider.clientWidth;
    }

    slider.style.transform = `translateX(-${this.scrollAmount}px)`;
  }
}
