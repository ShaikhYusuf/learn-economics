import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cloze-test',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './cloze-test.component.html',
  styleUrls: ['./cloze-test.component.css'],
})
export class ClozeTestComponent implements OnInit {
  questions: any[] = [];
  lessonId: number | null = null;
  selectedAnswer: { [key: number]: string } = {};
  answerStatus: { [key: number]: string } = {};

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
    const url = `./public/clozetest/lesson${lessonId}.json`;
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
        console.error('Error loading cloze test data:', error);
      },
    });
  }

  onSubmit(): void {
    this.questions.forEach((question: any) => {
      const userAnswer = this.selectedAnswer[question.id]?.trim().toLowerCase() || '';
      if (userAnswer === question.answer.trim().toLowerCase()) {
        this.answerStatus[question.id] = 'correct';
      } else if (userAnswer === '') {
        this.answerStatus[question.id] = 'empty';
      } else {
        this.answerStatus[question.id] = 'incorrect';
      }
    });
  }

  getParts(question: string): string[] {
    return question.split(/(_+)/).filter((part) => part.trim() !== '');
  }
}
