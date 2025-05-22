import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  OnInit
} from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css'],
})
export class HomepageComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @ViewChildren('slide') slides!: QueryList<ElementRef>;
  @ViewChildren('dot') dots!: QueryList<ElementRef>;

  slideIndex: number = 0;
  intervalId: any;

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    });
  }

  ngAfterViewInit() {
    this.showSlides();
    this.intervalId = setInterval(() => this.showSlides(), 5000);
  }

  showSlides() {
    const slidesArray = this.slides.toArray();
    const dotsArray = this.dots.toArray();

    if (slidesArray.length === 0 || dotsArray.length === 0) return;

    slidesArray.forEach(slide => {
      slide.nativeElement.style.display = 'none';
    });

    dotsArray.forEach(dot => {
      dot.nativeElement.classList.remove('active');
    });

    this.slideIndex++;
    if (this.slideIndex > slidesArray.length) {
      this.slideIndex = 1;
    }

    slidesArray[this.slideIndex - 1].nativeElement.style.display = 'block';
    dotsArray[this.slideIndex - 1].nativeElement.classList.add('active');
  }

  currentSlide(n: number) {
    this.slideIndex = n - 1;
    this.showSlides();
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.showSlides(), 5000);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  reservation() {
    this.router.navigate(['reservation']);
  }

  reservationlist() {
    this.router.navigate(['reservationlist']);
  }

  login() {
    if (confirm('Are you sure you want to logout?')) {
    this.router.navigate(['login']);
  }}

feedbackData = {
    name: '',
    message: ''
  };

  submitFeedback() {
    if (this.feedbackData.name && this.feedbackData.message) {
      console.log('Feedback submitted:', this.feedbackData);

      // Optionally reset the form
      this.feedbackData = { name: '', message: '' };

      alert('Thank you for your feedback!');
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
