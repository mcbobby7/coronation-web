import { Component, OnInit, Input} from '@angular/core';
import { trigger, transition, style, animate } from "@angular/animations";


@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdCardComponent implements OnInit {
  @Input() backgroundImg;
  @Input() overlay;
  slides = [
    {
      img: "assets/images/ad1.png",
      url: "https://google.com"
    },
    {
      img: "assets/images/ad3.jpg",
      url: "https://google.com"
    },
    {
      img: "assets/images/ad2.jpg",
      url: "https://google.com"
    }
  ]
  currentSlide = 0;


  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.onNextClick()
    }, 3000)
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  setIndex(i) {
    // this.currentSlide = i
    // console.log(i);

  }

}
