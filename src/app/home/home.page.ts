import { Component } from '@angular/core';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
 import { HttpClient, HttpParams} from '@angular/common/http';
 import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  ipA;

  nk;
  nklog = '';

  tosync;

  constructor(private http: HttpClient, private storage: Storage){


    this.storage.get('nklog').then(val => {
      this.nklog = val
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
     document.getElementById('logArea').innerHTML =   'Nibras Desktop offline';
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
     document.getElementById('logArea').innerHTML =   'Nibras Desktop offline';
    })
  })

}

clearSync(){
  this.storage.set('tosync', '')
  this.tosync = ''
  this.storage.set('nklog', '')
  this.nklog = ''
  document.getElementById('logArea').innerHTML =   'All cleared.';
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
      document.getElementById('logArea').innerHTML = 'Not synced'
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
    .set('tosync2', val); 
    const httpOptions = {
      headers: new Headers({
        'Content-Type':  'application/json'
        }), params
      }; 
      var ipp = this.ipA
      var link = "https://" + ipp + "/nibras/sync/mobilePush2"
      this.http.get(link,{params: params}).subscribe(response => {          
      document.getElementById('logArea').innerHTML = response['result']
      this.storage.set('nklog', '')
      this.nklog = ''
      this.syncData();
      },
      err => {    
       document.getElementById('logArea').innerHTML = 'Not synced'
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
        
        this.syncType('Todo', 'Todo')

        this.syncType('T', 'Tasks')
        this.syncType('Cal', 'Calendar')
        this.syncType('P', 'Planner')
        
        this.syncType('G', 'Goals')
        this.syncType('K', 'Nk piles')
        this.syncType('Key', 'Key notes')
        this.syncType('N', 'Notes')
    this.syncType('W', 'Writings')
    this.syncType('Nws', 'News')
    this.syncType('Art', 'Articles')
    this.syncType('R', 'Active study')
    
    document.getElementById('logArea').innerHTML = 'All were synced.'

      },
      err => {               
       document.getElementById('logArea').innerHTML =   'Nibras Desktop offline';
         
       this.syncType('Todo', 'Todo')

       this.syncType('T', 'Tasks')
       this.syncType('Cal', 'Calendar')
       this.syncType('P', 'Planner')
       
       this.syncType('G', 'Goals')
       this.syncType('K', 'Nk piles')
       this.syncType('Key', 'Key notes')
       this.syncType('N', 'Notes')
   this.syncType('W', 'Writings')
   this.syncType('Nws', 'News')
   this.syncType('Art', 'Articles')
   this.syncType('R', 'Active study')
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
