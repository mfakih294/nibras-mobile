import { Component, OnInit } from '@angular/core';

import { HttpClient} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';

 import { File , DirectoryEntry} from '@ionic-native/file/ngx';
 //import {File, DirectoryEntry} from '@ionic-native/file';


@Component({
  selector: 'app-r',
  templateUrl: './r.page.html',
  styleUrls: ['../app.component.scss']
})
export class RPage implements OnInit {
items = ''
ipA
ipL
message = ''
  constructor(private file: File, private storage: Storage){

    this.storage.get('mytextR').then((val) => {
      this.items = val;
      
    }); 
    
    // this.file.checkDir(this.file.dataDirectory, 'rps').then(_ =>             
    //    document.getElementById('logArea').innerHTML =  'Exists!'    
    //    ).catch(err =>
    //   console.log('Directory doesnt exist')
    //   );
      

} // end of constructor

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
