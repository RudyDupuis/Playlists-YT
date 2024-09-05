import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = environment.apiUrl;
  private playlistSubject = new BehaviorSubject<Video[]>([]);
  videos$ = this.playlistSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getPlaylist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/playlist`, {
      headers: this.getAuthHeaders(),
    });
  }

  addVideos(videoId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/playlist/videos`,
      { videoId },
      { headers: this.getAuthHeaders() }
    );
  }

  removeVideos(videoId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/playlist/videos/${videoId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateVideos(videos: Video[]) {
    this.playlistSubject.next(videos);
  }
}
