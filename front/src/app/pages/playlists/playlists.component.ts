import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { WatchVideoComponent } from '../../components/watch-video/watch-video.component';
import { SearchVideosComponent } from '../../components/search-videos/search-videos.component';
import { PlaylistService } from '../../services/playlist.service';
import { Video } from '../../models/Video';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [WatchVideoComponent, SearchVideosComponent],
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  pseudo: string | undefined;
  componentToShow: 'watch' | 'search' = 'search';
  videos: Video[] = [];
  selectedVideo: Video | undefined;

  constructor(
    private authService: AuthService,
    private playlistService: PlaylistService
  ) {
    this.pseudo = this.authService.getPseudo();
  }

  ngOnInit(): void {
    this.playlistService.videos$.subscribe((videos) => {
      this.videos = videos;
    });
  }

  selectVideo(video: Video) {
    this.selectedVideo = video;
    this.componentToShow = 'watch';
  }

  removeVideoFromPlaylist(video: Video) {
    this.playlistService.removeVideos(video).subscribe();
  }
}
