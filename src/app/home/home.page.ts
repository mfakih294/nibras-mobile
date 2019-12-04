import { Component } from '@angular/core';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
 import { HttpClient, HttpParams,  HttpHeaders} from '@angular/common/http';
 import { FormsModule } from '@angular/forms';
 import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
   import { File } from '@ionic-native/file/ngx';
 // import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { PreviewAnyFile } from '@ionic-native/preview-any-file';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ipA;
  ipF;

  nk;
  nklog = '';

  tosync;

  //PreviewAnyFile: any;

  loading: any;

  constructor(private http: HttpClient,  private file: File,
    private iab: InAppBrowser,
    // private fileOpener: FileOpener,
    private storage: Storage, private localNotifications: LocalNotifications ){

    // Schedule a single notification

    // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
      // console.log('Directory doesnt exist'));

      
  
    this.storage.get('nklog').then(val => {
      this.nklog = val
    });

    this.storage.get('ipF').then((val) => {
      this.ipF = val;
    });

    this.storage.get('ipA').then((val) => {
    this.ipA = val;
    var link = "https://" + this.ipA + "/nibras/page/heartbeatJson"

    this.http.get(link,{}).subscribe(response => {                
      if (response['result'] == 'ok')
      document.getElementById('logArea').innerHTML =   'Nibras Desktop online';    
      //console.log ('res' + response['result'])
    },
    err => {               
  //  document.getElementById('logArea').innerHTML =   'Nibras Desktop offline';

    

    })

 
     
   // this.syncAll();
    });

    this.storage.get('tosync').then((val) => {
      this.tosync = val  
      });

      this.syncData()
  
} // end of constructor

refresh(){
  this.storage.get('ipA').then((val) => {
    this.ipA = val;
    var link = "https://" + this.ipA + "/nibras/page/heartbeatJson"

    this.http.get(link,{}).subscribe(response => {                
      if (response['result'] == 'ok')
      document.getElementById('logArea').innerHTML =   'Nibras Desktop online';    
      //console.log ('res' + response['result'])
    },
    err => {               
     document.getElementById('logArea').innerHTML =   'Nibras Desktop offline: '  + err.message;
    })
  })

  

  
// this.localNotifications.schedule({
//   id: 1,
//   text: 'Nibras mobile single Local Notification',
//   title: 'Notification title: an alarm',
//   trigger: {at: new Date(new Date().getTime() + 10000)},
//   data: { secret: 'secret' }
// });
}

clearSync(){
  this.storage.set('tosync', '')
  this.tosync = ''
  this.storage.set('nklog', '')
  this.nklog = ''
  document.getElementById('logArea').innerHTML  = 'All cleared.';

}
change() 
{
 let v = prompt("Nibras IP", this.ipA)
 if (v){
 this.ipA = v
 this.storage.set('ipA', this.ipA);
 }
 else console.log('cancelled');    
 // todo : if cancelled, null taken!!
}

changeF() 
{
 let v = prompt("Nibras Files IP", this.ipF)
 if (v){
 this.ipF = v
 this.storage.set('ipF', this.ipF);
 }
 else console.log('cancelled');    
 // todo : if cancelled, null taken!!
}


savek(){

  this.storage.get('nklog').then(val => {
    if (!this.nk || this.nk == null || this.nk == '' || this.nk == ' '){
    document.getElementById('logArea').innerHTML = 'No text to append';
    console.log('new:' + this.nk);
    }
    else {

      
    let current_datetime = new Date()
    this.nklog = 
      current_datetime.getDate() + "." + (current_datetime.getMonth() + 1) + "." + 
      current_datetime.getFullYear() + ' ' + 
      current_datetime.getHours() + ":" + current_datetime.getMinutes() +
      ' :: '  + this.nk + '<br/>'    
    + val 
    this.storage.set('nklog', this.nklog)
    //document.getElementById('nklog').innerHTML =  this.nklog;
    //document.getElementById('nk').nodeValue('')
    document.getElementById('nkinput').focus()

    this.nk = ''
    }
  }) 
  document.getElementById('nkinput').focus();
  
}

syncDone(){
  this.storage.get('ipA').then(val => {
    this.ipA = val       
   this.storage.get('tosync').then((val) => {
   const params = new HttpParams()
   .set('tosync', val); 
   const httpOptions = {
     headers: new Headers({
       'Content-Type':  'application/json'
       }), params
     }; 
     var ipp = this.ipA
     var link = "https://" + ipp + "/nibras/sync/mobilePush"
     this.http.get(link,{params: params}).subscribe(response => {          
     document.getElementById('logArea').innerHTML = response + ' synced.'     
     this.storage.set('tosync', '')
     this.syncData();
     },
     err => {    
      document.getElementById('logArea').innerHTML = 'Not synced: '  + err.message
     })

     
   }); 
  }); 

 
}
syncWritings() 
 {
  this.storage.get('ipA').then(val => {
    this.ipA = val       

   this.storage.get('nklog').then((val) => {
    const params = new HttpParams()
    
    //.set('tosync', val.replace('\n', ' ').replace('&', ' and ').replace('/', ' fs ')); 
    

    var headers = new HttpHeaders();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    const httpOptions = { headers: headers };

   

    //  const httpOptions = {
    //    headers: new Headers({
    //     'Content-Type':  'application/json',
    //     "Accept": 'application/json'
    //     })
    //      , params
    //    }; 
        let postData = {
           "data": val.replace(/<br\/>/g, '\n')
   }
      var ipp = this.ipA
      var link = "https://" + ipp + "/nibras/sync/mobileWritings"
   
      this.http.post(link, postData, httpOptions).subscribe(response => {          
      document.getElementById('logArea').innerHTML = response['result']
    //  this.storage.set('nklog', '')
    //  this.nklog = ''
    //  this.syncData();
      },
      err => {    
       document.getElementById('logArea').innerHTML = 'Not synced: ' + err.message
      })
    });
   });
   

 
 }
syncData() 
 {
  
    this.storage.get('ipA').then(val => {
    this.ipA = val    
         var link = "https://" + this.ipA + "/nibras/page/heartbeatJson"
  
      this.http.get(link,{}).subscribe(response => {                
        if (response['result'] == 'ok')
        document.getElementById('logArea').innerHTML =   'Nibras Desktop online';    
        
        // this.syncType('Todo', 'Todo')

        this.syncType('T', 'Tasks')
        // this.syncType('Cal', 'Calendar')
        this.syncType('P', 'Planner')
        
        this.syncType('G', 'Goals')
        // this.syncType('K', 'Nk piles')
         this.syncType('E', 'Excerpts')
        this.syncType('N', 'Notes')
    this.syncType('W', 'Writings')
    this.syncType('Nws', 'News')
    this.syncType('Art', 'Articles')
    this.syncType('R', 'Resources')
    

  

    document.getElementById('logArea').innerHTML = 'All were synced.'

      },
      err => {               
       document.getElementById('logArea').innerHTML =   'Nibras Desktop offline '  + err.message;
         
      //  this.syncType('Todo', 'Todo')

       this.syncType('T', 'Tasks')
   //    this.syncType('Cal', 'Calendar')
       this.syncType('P', 'Planner')
       
       this.syncType('G', 'Goals')
      //  this.syncType('K', 'Nk piles')
        this.syncType('E', 'Excerpts')
       this.syncType('N', 'Notes')
   this.syncType('W', 'Writings')
   this.syncType('Nws', 'News')
   this.syncType('Art', 'Articles')
   this.syncType('R', 'Resources')
      })

      

   

    //  console.log('Result from server was ok!', types[t])     
    //  },
    //  err => {    
      // document.getElementById('logArea').innerHTML = 'Offline'
    //  })
  //  }
//

   });


  } // end of sync

  syncType(type, label){
    this.http.get("https://" + this.ipA + "/nibras/sync/exportJson" + type).subscribe(response => {     
  let t = type;
this.storage.set('mytext' + t, response['data']);
document.getElementById('menuItem' + t).innerHTML =   label + ' (' +  response['data'].length + ')'

  // Schedule delayed notification
  
  if(type == 'P'){
    response['data'].forEach((e) =>
    {
    var d = e.meta.split('-');
    var date = new Date(d[2], d[1] - 1, d[0], d[3], d[4], 0 );
    var id = e.id
    var title = e.title;
    var body = e.body;
    //console.log('sch ' + date);
    this.localNotifications.schedule({
      id: id,
      text: (body ? body : ''),
      title: 'Plan: ' + title,
      trigger: {at: date},
      group: 'Nibras',
      vibrate: true,
      led: 'FF0000'
      //, sound: null
    });
    }
    )
  
  }


}, error =>{
  let t = type;
  this.storage.get('mytext' + t).then((val) => {
    if (val){
    document.getElementById('menuItem' + t).innerHTML =   label + ' (' +  val.length + ')'
     };
    });

});
  }
  update() 
  {
   this.storage.set('ipA', this.ipA);
   console.log('ip local : ' , this.ipA)
   this.storage.get('ipA').then((val) => {
     console.log('ip storage: ' , val);    
      });
   
 
      console.log('ip1local : ' , this.ipA)
   this.storage.get('ipA').then((val) => {
     console.log('ip1storage: ' , val);
     this.ipA = val    
      });
      console.log('ip2local : ' , this.ipA)
 
   if (this.ipA){
     
    
     //mytext = ''
     //fetch('http://localhost:1441/nibras/page/heartbeat', {})
       //.then(res => res.json())
       //.then(posts => console.log('posts ' + posts))
     
       // this.storage.get('ipA').then((val) => {
         // this.ipA = val;    
         //  });
          console.log('IP found in local storage.', this.ipA)
   
   
   // console.log(response['data'])
   
   
     // Or to get a key/value pair
      
     //  storage.get('name').
      } else {
        console.log('local ip not set!!')
     }
   
   
   //pipe(map((res: Response) =>{
   //var data = res.json();
   //console.log('my data: ', data);
   //}));
   
 
   
 }
 

 
}
