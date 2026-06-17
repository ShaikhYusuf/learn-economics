import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizService } from './quiz.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eco';
  isSidebarActive = false;
  selectedLessonId: string = 'intro';
  siteTitle = 'Economics Learning';

  menuItems = [
    { name: 'Introduction', url: 'intro', id: 'intro' },
    { name: 'Lesson 1: An Idea is Born', url: 'les1', id: '1', hasAssessments: true },
    { name: 'Lesson 2: Share the Wealth', url: 'les2', id: '2', hasAssessments: true },
    { name: 'Lesson 3: Credit Cards & Loans', url: 'les3', id: '3', hasAssessments: true },
    { name: 'Lesson 4: Economic Expansion', url: 'les4', id: '4', hasAssessments: true },
    { name: 'Lesson 5: Prosperity & Production', url: 'les5', id: '5', hasAssessments: true },
    { name: 'Lesson 6: Capital and Tech', url: 'les6', id: '6', hasAssessments: true },
    { name: 'Lesson 7: Infrastructure', url: 'les7', id: '7', hasAssessments: true },
    { name: 'Lesson 8: Savings & Investment', url: 'les8', id: '8', hasAssessments: true },
    { name: 'Lesson 9: Service Sector', url: 'les9', id: '9', hasAssessments: true },
    { name: 'Lesson 10: Retail & Wholesale', url: 'les10', id: '10', hasAssessments: true },
    { name: 'Lesson 11: Trade & Exchange', url: 'les11', id: '11', hasAssessments: true },
    { name: 'Lesson 12: Currency Standard', url: 'les12', id: '12', hasAssessments: true },
    { name: 'Lesson 13: Central Banking', url: 'les13', id: '13', hasAssessments: true },
    { name: 'Lesson 14: Inflation & Bubble', url: 'les14', id: '14', hasAssessments: true },
    { name: 'Lesson 15: Housing Bust', url: 'les15', id: '15', hasAssessments: true },
    { name: 'Lesson 16: Deficit & Debt', url: 'les16', id: '16', hasAssessments: true },
    { name: 'Lesson 17: Global Commerce', url: 'les17', id: '17', hasAssessments: true }
  ];

  constructor(private router: Router, public quizService: QuizService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects || event.url;
      const lessonMatch = url.match(/\/les(\d+)/);
      const quizMatch = url.match(/\/quiz\/(\d+)/);
      const clozeMatch = url.match(/\/clozeTests\/(\d+)/);
      const tfMatch = url.match(/\/trueFalse\/(\d+)/);
      const slMatch = url.match(/\/singleLine\/(\d+)/);
      const compMatch = url.match(/\/comprehernsive\/(\d+)/);
      
      if (lessonMatch) {
        this.selectedLessonId = lessonMatch[1];
      } else if (quizMatch) {
        this.selectedLessonId = quizMatch[1];
      } else if (clozeMatch) {
        this.selectedLessonId = clozeMatch[1];
      } else if (tfMatch) {
        this.selectedLessonId = tfMatch[1];
      } else if (slMatch) {
        this.selectedLessonId = slMatch[1];
      } else if (compMatch) {
        this.selectedLessonId = compMatch[1];
      } else if (url.includes('/intro')) {
        this.selectedLessonId = 'intro';
      }
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('participant') != null;
  }

  getUserName(): string {
    return this.quizService.getParticipantName();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/register']);
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }

  selectLesson(id: string, url: string): void {
    this.selectedLessonId = id;
    this.router.navigate([url]);
    if (window.innerWidth <= 992) {
      this.isSidebarActive = false;
    }
  }

  navigate(url: string): void {
    this.router.navigate([url]);
    if (window.innerWidth <= 992) {
      this.isSidebarActive = false;
    }
  }

  getCurrentStep() {
    const url = this.router.url;
    if (url.includes('/register')) {
      return null;
    }
    if (url.includes('/intro')) {
      return { type: 'intro', num: 0, index: 0 };
    }
    
    // Check lessons
    let match = url.match(/\/les(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return { type: 'lesson', num, index: (num - 1) * 6 + 1 };
    }
    
    // Check quiz
    match = url.match(/\/quiz\/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return { type: 'quiz', num, index: (num - 1) * 6 + 2 };
    }

    // Check clozeTests
    match = url.match(/\/clozeTests\/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return { type: 'clozeTests', num, index: (num - 1) * 6 + 3 };
    }

    // Check trueFalse
    match = url.match(/\/trueFalse\/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return { type: 'trueFalse', num, index: (num - 1) * 6 + 4 };
    }

    // Check singleLine
    match = url.match(/\/singleLine\/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return { type: 'singleLine', num, index: (num - 1) * 6 + 5 };
    }

    // Check comprehensive
    match = url.match(/\/comprehernsive\/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      return { type: 'comprehernsive', num, index: (num - 1) * 6 + 6 };
    }

    return null;
  }

  getStepUrl(index: number): string {
    if (index === 0) return 'intro';
    const num = Math.floor((index - 1) / 6) + 1;
    const subStep = (index - 1) % 6;
    switch (subStep) {
      case 0: return `les${num}`;
      case 1: return `quiz/${num}`;
      case 2: return `clozeTests/${num}`;
      case 3: return `trueFalse/${num}`;
      case 4: return `singleLine/${num}`;
      case 5: return `comprehernsive/${num}`;
      default: return 'intro';
    }
  }

  hasPreviousStep(): boolean {
    const step = this.getCurrentStep();
    return step !== null && step.index > 0;
  }

  hasNextStep(): boolean {
    const step = this.getCurrentStep();
    return step !== null && step.index < 102; // Max step: Lesson 17 Comprehensive (17-1)*6 + 6 = 102
  }

  goToPreviousStep(): void {
    const step = this.getCurrentStep();
    if (step && this.hasPreviousStep()) {
      const prevUrl = this.getStepUrl(step.index - 1);
      const prevLessonId = step.index - 1 === 0 ? 'intro' : (Math.floor((step.index - 2) / 6) + 1).toString();
      this.selectedLessonId = prevLessonId;
      this.router.navigate([prevUrl]);
    }
  }

  goToNextStep(): void {
    const step = this.getCurrentStep();
    if (step && this.hasNextStep()) {
      const nextUrl = this.getStepUrl(step.index + 1);
      const nextLessonId = (Math.floor(step.index / 6) + 1).toString();
      this.selectedLessonId = nextLessonId;
      this.router.navigate([nextUrl]);
    }
  }

  getPreviousButtonText(): string {
    const step = this.getCurrentStep();
    if (!step) return 'Previous';
    if (step.type === 'lesson') {
      return step.num === 1 ? 'Back to Intro' : 'Back to Comprehensive';
    }
    if (step.type === 'quiz') return 'Back to Lesson';
    if (step.type === 'clozeTests') return 'Back to Quiz';
    if (step.type === 'trueFalse') return 'Back to Cloze Test';
    if (step.type === 'singleLine') return 'Back to True/False';
    if (step.type === 'comprehernsive') return 'Back to Single Line';
    return 'Previous';
  }

  getNextButtonText(): string {
    const step = this.getCurrentStep();
    if (!step) return 'Next';
    if (step.type === 'intro') return 'Start Lesson 1';
    if (step.type === 'lesson') return 'Go to Quiz';
    if (step.type === 'quiz') return 'Go to Cloze Test';
    if (step.type === 'clozeTests') return 'Go to True/False';
    if (step.type === 'trueFalse') return 'Go to Single Line';
    if (step.type === 'singleLine') return 'Go to Comprehensive';
    if (step.type === 'comprehernsive') return 'Next Lesson';
    return 'Next';
  }

  getStepIndicatorText(): string {
    const step = this.getCurrentStep();
    if (!step) return '';
    if (step.type === 'intro') return 'Introduction';
    const typeLabel = {
      'lesson': 'Content',
      'quiz': 'Quiz',
      'clozeTests': 'Cloze Test',
      'trueFalse': 'True or False',
      'singleLine': 'Single Line',
      'comprehernsive': 'Comprehensive'
    }[step.type] || '';
    return `Lesson ${step.num} of 17: ${typeLabel}`;
  }
}
