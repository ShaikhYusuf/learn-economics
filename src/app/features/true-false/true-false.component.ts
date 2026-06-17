import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-true-false',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatButtonToggleModule],
  templateUrl: './true-false.component.html',
  styleUrls: ['./true-false.component.css'],
})
export class TrueFalseComponent {
  questions: any[] = [];
  lessonId: number | null = null;
  selectedAnswer: { [key: number]: string } = {};
  answerStatus: { [key: number]: string } = {}; // Track status of answers
  message: string = ''; // Message to show when there's an empty answer

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const lessonIdParam = params.get('lessonId');
      if (lessonIdParam) {
        this.lessonId = +lessonIdParam; // Convert to number
        this.loadQuestions(this.lessonId);
      }
    });
  }

  loadQuestions(lessonId: number): void {
    const url = `./public/truefalse/lesson${lessonId}.json`; // Ensure URL is correct
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        console.log('Loaded questions:', data); // Log loaded data
        this.questions = data;
        this.questions.forEach((question, index) => {
          // Ensure `answer` property exists and is a string
          if (!question.answer) {
            question.answer = ''; // Default to empty string if not defined
          }
        });
      },
      error: (error) => {
        console.error('Error loading true/false test data:', error);
      },
    });
  }

  onSubmit(): void {
    this.message = ''; // Clear any previous message

    // Reset the answer statuses before checking new answers
    this.answerStatus = {};

    let allAnswered = true; // Flag to check if all answers are filled

    this.questions.forEach((question: any) => {
      const userAnswer = this.selectedAnswer[question.id]?.trim().toLowerCase() || '';

      if (userAnswer === '') {
        this.answerStatus[question.id] = 'empty';
        allAnswered = false; // Mark as false if any question is not answered
      } else if (userAnswer === question.answer.trim().toLowerCase()) {
        this.answerStatus[question.id] = 'correct';
      } else {
        this.answerStatus[question.id] = 'incorrect';
      }
    });

    // Show message if any answer is empty
    if (!allAnswered) {
      this.message = 'Please fill in all the blanks!';
    }

    console.log('Answer Status:', this.answerStatus); // Log answer status
  }
}
