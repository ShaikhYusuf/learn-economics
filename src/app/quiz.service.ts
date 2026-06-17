import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class QuizService {
  constructor() {}

  getParticipantName(): string {
    const participant = JSON.parse(localStorage.getItem("participant") || '{}');
    return participant.name || participant.Name || 'Guest';
  }

  insertParticipant(name: string, email: string) {
    const participant = {
      Id: Math.floor(Math.random() * 10000),
      Name: name,
      Email: email,
      Score: 0,
      TimeSpent: 0
    };
    localStorage.setItem("participant", JSON.stringify(participant));
    return of(participant);
  }
}
