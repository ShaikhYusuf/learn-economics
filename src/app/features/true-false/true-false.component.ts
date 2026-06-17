import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-true-false',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.css'],
})
export class TrueFalseComponent implements OnInit {
  questions: any[] = [];
  lessonId: number | null = null;
  selectedAnswer: { [key: number]: string } = {};
  answerStatus: { [key: number]: string } = {};
  message: string = '';
  submitted = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const lessonIdParam = params.get('lessonId');
      if (lessonIdParam) {
        this.lessonId = +lessonIdParam;
        this.loadQuestions(this.lessonId);
      }
    });
  }

  loadQuestions(lessonId: number): void {
    const url = `./public/truefalse/lesson${lessonId}.json`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.questions = data;
        this.questions.forEach((question) => {
          if (!question.answer) {
            question.answer = '';
          }
        });
      },
      error: (error) => {
        console.error('Error loading true/false test data:', error);
      },
    });
  }

  selectOption(questionId: number, value: string): void {
    if (!this.submitted) {
      this.selectedAnswer[questionId] = value;
    }
  }

  onSubmit(): void {
    this.message = '';
    this.answerStatus = {};
    let allAnswered = true;

    this.questions.forEach((question: any) => {
      const userAnswer = this.selectedAnswer[question.id]?.trim().toLowerCase() || '';

      if (userAnswer === '') {
        this.answerStatus[question.id] = 'empty';
        allAnswered = false;
      } else if (userAnswer === question.answer.trim().toLowerCase()) {
        this.answerStatus[question.id] = 'correct';
      } else {
        this.answerStatus[question.id] = 'incorrect';
      }
    });

    if (!allAnswered) {
      this.message = 'Please answer all the questions!';
      return;
    }

    this.submitted = true;
  }
}
