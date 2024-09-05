import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { WatchVideoComponent } from '../../components/watch-video/watch-video.component';
import { SearchVideosComponent } from '../../components/search-videos/search-videos.component';
import { PlaylistService } from '../../services/playlist.service';
import { YoutubeService } from '../../services/youtube.service';
import { Video } from '../../models/Video';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [WatchVideoComponent, SearchVideosComponent],
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  pseudo: string | undefined = undefined;
  componentToShow: 'watch' | 'search' = 'search';
  videos: Video[] = [];

  constructor(
    private authService: AuthService,
    private playlistService: PlaylistService,
    private youtubeService: YoutubeService
  ) {
    this.pseudo = this.authService.getPseudo();
  }

  ngOnInit(): void {
    this.playlistService.getPlaylist().subscribe({
      next: (response) => {
        response.videos.forEach((videoId: string) => {
          this.youtubeService.getVideoById(videoId).subscribe({
            next: (response) => {
              this.videos.push(
                new Video(
                  videoId,
                  response.snippet.title,
                  response.snippet.thumbnails.default.url
                )
              );
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

  removeVideoFromPlaylist(videoId: string) {
    this.playlistService.removeVideos(videoId).subscribe({
      next: () => {
        this.videos = this.videos.filter((video) => video.id !== videoId);
      },
      error: (error) => {
        console.error('Error removing video from playlist:', error);
      },
    });
  }
}
