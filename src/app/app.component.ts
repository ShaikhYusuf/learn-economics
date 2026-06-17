import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eco';
  isSidebarActive = true;
  selectedLessonId: string = 'intro';
  expandedLessons: { [key: string]: boolean } = { 'intro': true };

  siteTitle = 'Economics Learning';

  constructor(private router: Router) {}

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

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }

  toggleLessonExpand(id: string): void {
    this.expandedLessons[id] = !this.expandedLessons[id];
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
}
