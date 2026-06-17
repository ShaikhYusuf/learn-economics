import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-comprehernsive',
  imports: [CommonModule, FormsModule, MatCardModule],
  templateUrl: './comprehernsive.component.html',
  styleUrl: './comprehernsive.component.css'
})
export class ComprehernsiveComponent {
  questions: any[] = [];
  selectedAnswer: { [key: number]: string } = {};
  answerStatus: { [key: number]: string } = {}; // Track status of answers
  lessonId: number | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const lessonIdParam = params.get('lessonId');
      if (lessonIdParam) {
        this.lessonId = +lessonIdParam; // Convert to number
        this.loadQuestions(this.lessonId); // Load the questions
      }
    });
  }

  loadQuestions(lessonId: number): void {
    const url = `public/comprehensive/lesson${lessonId}.json`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error) => {
        console.error('Error loading comprehensive answer test data:', error);
        alert('Failed to load data');
      },
    });
  }

  onSubmit(): void {
    this.questions.forEach((question: any) => {
      const userAnswer = this.selectedAnswer[question.id]?.trim().toLowerCase() || '';
      if (userAnswer === question.answer.toLowerCase()) {
        this.answerStatus[question.id] = 'correct';
      } else if (userAnswer === '') {
        this.answerStatus[question.id] = 'empty';
      } else {
        this.answerStatus[question.id] = 'incorrect';
      }
    });
  }
}
