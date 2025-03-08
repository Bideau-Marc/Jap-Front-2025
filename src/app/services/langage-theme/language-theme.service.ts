import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Pour faire des requêtes HTTP
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Theme } from '../../model/theme';

@Injectable({
  providedIn: 'root'
})
export class LanguageThemeService {

  private apiUrl = environment.apiUrl;  // Remplace par l'URL de ton API backend

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les thèmes
  getThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/themes`);
  }
}
