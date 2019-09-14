import { Component, OnInit } from '@angular/core';

//import { HttpClient} from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';

 import { map } from 'rxjs/operators';
 import { Storage } from '@ionic/storage';
 import { ComponentsModule } from '../components/components.module';
import { NibrasListComponent } from '../components/nibras-list/nibras-list.component';
@Component({
  selector: 'app-nws',
  templateUrl: './nws.page.html',
  styleUrls: ['../app.component.scss']
})
export class NwsPage implements OnInit {
items = ''
ipA
ipL
message = ''
  constructor(private storage: Storage){

    this.storage.get('mytextNws').then((val) => {
      this.items = val;
    }); 
} // end of constructor

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
