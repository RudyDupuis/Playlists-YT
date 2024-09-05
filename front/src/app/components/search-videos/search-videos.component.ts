import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { YoutubeService } from '../../services/youtube.service';
import { PlaylistService } from '../../services/playlist.service';
import { Video } from '../../models/Video';

@Component({
  selector: 'app-search-videos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-videos.component.html',
})
export class SearchVideosComponent {
  searchForm: FormGroup;
  videos: any[] = [];
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private youtubeService: YoutubeService,
    private playlistService: PlaylistService
  ) {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }

  search() {
    const query = this.searchForm.get('query')?.value;

    if (!query) {
      return;
    }

    this.youtubeService.searchVideos(query).subscribe({
      next: (results) => {
        this.videos = results;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la recherche de vidéos';
      },
    });
  }

  addVideoToPlaylist(id: string, title: string, thumbnailUrl: string) {
    const video = new Video(id, title, thumbnailUrl);
    this.playlistService.addVideos(video.id).subscribe({
      next: () => {
        this.playlistService.updateVideos([...this.videos, video]);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error adding video to playlist:', error);
      },
    });
  }
}
