import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      type: 'home',
      url: '/home',
      icon: 'home'
    },

    {
      title: 'Todo',
      type: 'Todo',
      url: '/todo',
      icon: 'checkmark'
    },
    {
      title: 'Tasks',
      type: 'T',
      url: '/t',
      icon: 'checkmark'
    },
    {
      title: 'Calendar',
      type: 'Cal',
      url: '/cal',
      icon: 'checkmark'
    },
	  {
      title: 'Plans',
      type: 'P',
      url: '/p',
      icon: 'alarm'
    },
  
	  {
      title: 'Goals',
      type: 'G',
      url: '/g',
      icon: 'analytics'
    },
{
      title: 'N piles',
      type: 'K',
      url: '/k',
      icon: 'attach'
    },

    {
      title: 'Key notes',
      type: 'Key',
      url: '/key',
      icon: 'attach'
    },

    {
      title: 'Notes',
      type: 'N',
      url: '/n',
      icon: 'attach'
    },


	  {
      title: 'Writings',
      type: 'W',
      url: '/w',
      icon: 'create'
    },	 
	{
      title: 'Active study',
      type: 'R',
      url: '/r',
      icon: 'bookmarks'
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
      icon: 'bookmarks'
    } 
	
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
    });
  }
}
