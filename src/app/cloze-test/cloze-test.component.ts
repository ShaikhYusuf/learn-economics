import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cloze-test',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './cloze-test.component.html',
  styleUrls: ['./cloze-test.component.css'], // Fixed typo in `styleUrls`
})
export class ClozeTestComponent {
  questions: any[] = [];
  lessonId: number | null = null;
  selectedAnswer: { [key: number]: string } = {};
  answerStatus: { [key: number]: string } = {}; // Track status of answers

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
    const url = `./public/clozetest/lesson${lessonId}.json`; // Ensure URL is correct
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.questions = data;
        this.questions.forEach((question, index) => {
          // Ensure `answer` property exists and is a string
          if (!question.answer) {
            question.answer = ''; // Default to empty string if not defined
          }
        });
      },
      error: (error) => {
        console.error('Error loading cloze test data:', error);
      },
    });
  }

  onSubmit(): void {
    console.log('Selected Answers:', this.selectedAnswer); // Log to verify answers
    this.questions.forEach((question: any) => {
      // Get the user answer and trim any spaces
      const userAnswer = this.selectedAnswer[question.id]?.trim().toLowerCase() || '';

      // Check if the answer is correct, empty, or incorrect
      if (userAnswer === question.answer.trim().toLowerCase()) {
        this.answerStatus[question.id] = 'correct'; // Correct answer
      } else if (userAnswer === '') {
        this.answerStatus[question.id] = 'empty'; // Empty answer (error state)
      } else {
        this.answerStatus[question.id] = 'incorrect'; // Incorrect answer
      }
    });
    console.log('Answer Status:', this.answerStatus); // Log the answer status
  }

  getParts(question: string): string[] {
    return question.split(/(_+)/).filter((part) => part.trim() !== '');
  }
}
