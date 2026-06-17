import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  quizzes: any[] = [];
  selectedAnswers: { [key: number]: number } = {};
  submitted = false;
  lessonId!: number;

  constructor(private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { 
     const lessonId = this.activatedRoute.snapshot.paramMap.get('lessonId') ?? "1";
     this.lessonId = +lessonId;
  }

  ngOnInit() {
    this.loadQuizzes(this.lessonId);
  }

  loadQuizzes(lessonId: number): void {
    const url = `public/quiz/lesson${lessonId}.json`; // Adjusted path
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        console.log(`Loaded quizzes for lesson ${lessonId}:`, data);
        this.quizzes = data;
      },
      error: (error) => {
        console.error('Error loading quiz data:', error);
      },
    });
  }

  selectOption(quizId: number, optionIndex: number): void {
    if (!this.submitted) {
      this.selectedAnswers[quizId] = optionIndex;
    }
  }

  submitAnswers(): void {
    if (Object.keys(this.selectedAnswers).length < this.quizzes.length) {
      alert('Please answer all the questions before submitting.');
      return;
    }
    this.submitted = true;
  }

  getClass(quizId: number, optionIndex: number): string {
    if (!this.submitted) {
      return this.selectedAnswers[quizId] === optionIndex ? 'highlight' : '';
    }

    const quiz = this.quizzes.find((quiz) => quiz.id === quizId);
    if (!quiz) return '';

    const isCorrect = quiz.answer === optionIndex;
    const isSelected = this.selectedAnswers[quizId] === optionIndex;

    if (isCorrect) {
      return 'correct';
    } else if (isSelected) {
      return 'incorrect';
    } else {
      return '';
    }
  }
}
