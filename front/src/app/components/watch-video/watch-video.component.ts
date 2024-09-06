import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Video } from '../../models/Video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-watch-video',
  standalone: true,
  imports: [],
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
})
export class WatchVideoComponent implements OnInit, OnChanges {
  @Input() video: Video | undefined;
  videoUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.video) {
      this.updateVideoUrl();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['video'].currentValue !== undefined) {
      this.updateVideoUrl();
    }
  }

  updateVideoUrl(): void {
    if (this.video) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.video.id}`
      );
    }
  }
}
