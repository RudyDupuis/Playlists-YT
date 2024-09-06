import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Video } from '../models/Video';
import { YoutubeService } from './youtube.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  private apiUrl = environment.apiUrl;
  private playlistSubject = new BehaviorSubject<Video[]>([]);
  videos$ = this.playlistSubject.asObservable();

  constructor(
    private http: HttpClient,
    private youtubeService: YoutubeService,
    private cookieService: CookieService
  ) {
    this.getPlaylist().subscribe({
      next: (response) => {
        response.videos.forEach((videoId: string) => {
          this.youtubeService.getVideoById(videoId).subscribe({
            next: (response) => {
              this.playlistSubject.next([
                ...this.playlistSubject.value,
                new Video(
                  videoId,
                  response.snippet.title,
                  response.snippet.thumbnails.default.url
                ),
              ]);
            },
            error: (error) => {
              console.error('Error loading video:', error);
            },
          });
        });
      },
      error: (error) => {
        console.error('Error loading playlist:', error);
      },
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  private getPlaylist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/playlist`, {
      headers: this.getAuthHeaders(),
    });
  }

  addVideos(video: Video): Observable<any> {
    const response = this.http.post(
      `${this.apiUrl}/playlist/videos`,
      { videoId: video.id },
      { headers: this.getAuthHeaders() }
    );

    this.playlistSubject.next([...this.playlistSubject.value, video]);

    return response;
  }

  removeVideos(video: Video): Observable<any> {
    const response = this.http.delete(
      `${this.apiUrl}/playlist/videos/${video.id}`,
      {
        headers: this.getAuthHeaders(),
      }
    );

    this.playlistSubject.next(
      this.playlistSubject.value.filter((v) => v.id !== video.id)
    );

    return response;
  }
}
