import { Component, OnInit, Input } from '@angular/core';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-nibras-list',
  templateUrl: './nibras-list.component.html',
  styleUrls: ['./nibras-list.component.scss'],
})
export class NibrasListComponent implements OnInit {
  
  @Input() items: [];
@Input() expanded: boolean;


  constructor(private storage: Storage) { 
this.expanded = false

  }

  

openNext(item) 
{
  document.getElementById(item.type + '' + item.id).innerHTML = item.body
}

close(item) 
{
  document.getElementById(item.type + '' + item.id).innerHTML = ''
}

 markDone(item) 
{
  document.getElementById(item.type + '' + item.id).innerHTML = 'Done'
  this.storage.get('tosync').then((val) => {
    this.storage.set('tosync', val + ','  + item.type+ '' + item.id  );
    console.log('add to sync: ' , item.type+ '' + item.id + '');    
     });     
}




  ngOnInit() {}

}
