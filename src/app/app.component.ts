import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eco';
  isExplanationMenuActive = false; // Tracks if the explanation dropdown is active
  selectedLessonId: string = '1'; // Set the selected lesson dynamically

  constructor(private router: Router) {}
  menuItems = [
    {name: 'introduction', url: 'intro'},
    { name: 'Lesson 1', url: 'les1' },
    { name: 'Lesson 2', url: 'les2' },
    { name: 'Lesson 3', url: 'les3' },
    { name: 'Lesson 4', url: 'les4' },
    { name: 'Lesson 5', url: 'les5' },
    { name: 'Lesson 6', url: 'les6' },
    { name: 'Lesson 7', url: 'les7' },
    { name: 'Lesson 8', url: 'les8' },
    { name: 'Lesson 9', url: 'les9' },
    { name: 'Lesson 10', url: 'les10' },
    { name: 'Lesson 11', url: 'les11' },
    { name: 'Lesson 12', url: 'les12' },
    { name: 'Lesson 13', url: 'les13' },
    { name: 'Lesson 14', url: 'les14' },
    { name: 'Lesson 15', url: 'les15' },
    { name: 'Lesson 16', url: 'les16' },
    { name: 'Lesson 17', url: 'les17' },
    
  ];

  toggleExplanationMenu(): void {
    this.isExplanationMenuActive = !this.isExplanationMenuActive;
  }

  selectMenuItem(lessonId: number, itemUrl: string): void {
    this.selectedLessonId = lessonId.toString();
    this.router.navigate([itemUrl]); 
    this.isExplanationMenuActive = false; 
  }
}
