import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-single-line',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './single-line.component.html',
  styleUrls: ['./single-line.component.css'],
})
export class SingleLineAnswerComponent implements OnInit {
  questions: any[] = [];
  selectedAnswer: { [key: number]: string } = {};
  answerStatus: { [key: number]: string } = {};
  lessonId: number | null = null;
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
    const url = `./public/singleanswers/lesson${lessonId}.json`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error) => {
        console.error('Error loading single line test data:', error);
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
    this.submitted = true;
  }
}
