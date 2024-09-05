import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyBs-crpkVQ0NwWCt2WLjVPls-DnecduFZU';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<any> {
    const url = `${this.apiUrl}/search?q=${query}&key=${this.apiKey}&part=snippet&type=video&maxResults=10`;
    return this.http.get(url).pipe(map((response: any) => response.items));
  }

  getVideoById(videoId: string): Observable<any> {
    const url = `${this.apiUrl}/videos?id=${videoId}&key=${this.apiKey}&part=snippet,contentDetails,statistics&type=video`;
    return this.http.get(url).pipe(map((response: any) => response.items[0]));
  }
}
