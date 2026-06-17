import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comprehernsive',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './comprehernsive.component.html',
  styleUrl: './comprehernsive.component.css'
})
export class ComprehernsiveComponent implements OnInit {
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
    const url = `./public/comprehensive/lesson${lessonId}.json`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.questions = data;
      },
      error: (error) => {
        console.error('Error loading comprehensive answer test data:', error);
      },
    });
  }

  onSubmit(): void {
    this.questions.forEach((question: any) => {
      const userAnswer = this.selectedAnswer[question.id]?.trim().toLowerCase() || '';
      const correctAnswer = (question.Answer || question.answer || '').trim().toLowerCase();
      
      if (userAnswer === correctAnswer) {
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
