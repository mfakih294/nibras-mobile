import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Autostart } from '@ionic-native/autostart/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: '',
      type: 'home',
      url: '/home',
      icon: 'home'
    },

    // {
    //   title: 'Todo',
    //   type: 'Todo',
    //   url: '/todo',
    //   icon: 'checkmark'
    // },
    {
      title: 'Tasks',
      type: 'T',
      url: '/t',
      icon: 'checkmark'
    },
    // {
    //   title: 'Calendar',
    //   type: 'Cal',
    //   url: '/cal',
    //   icon: 'checkmark'
    // },
	  {
      title: 'Plans',
      type: 'P',
      url: '/p',
      icon: 'alarm'
    },
    {
      title: 'Journal',
      type: 'J',
      url: '/k',
      icon: 'clock'
    },
 
	  {
      title: 'Goals',
      type: 'G',
      url: '/g',
      icon: 'flag'
    },
// {
//       title: 'N piles',
//       type: 'K',
//       url: '/k',
//       icon: 'attach'
//     },


    {
      title: 'Notes',
      type: 'N',
      url: '/n',
      icon: 'card'
    },


	  {
      title: 'Writings',
      type: 'W',
      url: '/w',
      icon: 'clipboard'
    },
        {
      title: 'Excerpts',
      type: 'E',
      url: '/e',
      icon: 'bookmark'
    },
	 
	{
      title: 'Resources',
      type: 'R',
      url: '/r',
      icon: 'book'
    } ,
	{
      title: 'Articles',
      type: 'Art',
      url: '/art',
      icon: 'bookmarks'
    } 
	,	 
	{
      title: 'News',
      type: 'Nws',
      url: '/nws',
      icon: 'logo-rss'
    } 
	
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private autostart: Autostart
  ) {
    this.initializeApp();
    

    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
      this.autostart.enable();
    });
  }
}
