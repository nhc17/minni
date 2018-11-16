import {Directive, Input, HostBinding} from '@angular/core'


@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl()',
    '(load)': 'load()',
    '[src]':'src'
   }
})
export class ArticleThumbnailPreloadDirective {

    @Input() src:string;
    public defaultImg_url:string = "./public/images/default_img.jpg";
    @HostBinding('class') className

    public onError() {
      return this.defaultImg_url;
    }

    public checkPath(src) {
      return src ? src: this.defaultImg_url;
    }


  
    updateUrl() {
      this.src = this.defaultImg_url;
    }
    load(){
      this.className = 'img-loaded';
    }

  constructor() { }

}
