import { Component, OnInit, Input } from '@angular/core';

import { Storage } from '@ionic/storage';
 import { File } from '@ionic-native/file/ngx';
  import { FileOpener } from '@ionic-native/file-opener/ngx';
// import { PreviewAnyFile } from '@ionic-native/preview-any-file';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';



@Component({
  selector: 'app-nibras-list',
  templateUrl: './nibras-list.component.html',
  styleUrls: ['./nibras-list.component.scss'],
})
export class NibrasListComponent implements OnInit {
  
  @Input() items: [];
@Input() expanded: boolean;
tosyncText: String;

  constructor(private storage: Storage, private file: File,
    private clipboard: Clipboard,
    private fileOpener: FileOpener,
    private iab: InAppBrowser) { 
this.expanded = false

this.storage.get('tosync').then((val) => {
  this.tosyncText = val
  
   });  

  }

  copyText(item){
    this.clipboard.copy(item.title + ' :: ' + item.body.replace(/<br\/>/g, '\n'));
    document.getElementById(item.type + '' + item.id + 'copy').innerHTML = '<b>Copied</b>'
  }

clean(text){
  return (text != '' ? text.replace(/<br\/>/g, ' ').substring(0, 200) : '')
}
openNext(item) 
{
  document.getElementById(item.type + '' + item.id).innerHTML = item.body
  document.getElementById(item.type + '' + item.id + 'preview').innerHTML = ''

  document.getElementById('nkinput').setAttribute('value', item.ecode + item.id + ': ');
}
showFiles(item) 
{
  //document.getElementById(item.type + '' + item.id).innerHTML = item.body
  document.getElementById(item.type + '' + item.id + 'filesTr').classList.remove('hidden');
}
close(item) 
{
  document.getElementById(item.type + '' + item.id).innerHTML = ''
  document.getElementById(item.type + '' + item.id + 'preview').innerHTML = this.clean(item.body)
  document.getElementById(item.type + '' + item.id + 'title').scrollIntoView();
  document.getElementById(item.type + '' + item.id + 'preview').classList.add('justRead');
     document.getElementById(item.type + '' + item.id + 'title').classList.add('justRead');
}

 markDone(item) 
{
  document.getElementById(item.type + '' + item.id).innerHTML = ''
  this.storage.get('tosync').then((val) => {
    this.storage.set('tosync', val + ','  + item.ecode + '' + item.id  );
    console.log('add to sync: ' , item.ecode + '' + item.id + '');    
     });     
     document.getElementById(item.type + '' + item.id + 'title').classList.add('done');
     
     document.getElementById(item.type + '' + item.id + 'preview').classList.add('done');

     document.getElementById(item.type + '' + item.id + 'preview').classList.add('justDone');
     document.getElementById(item.type + '' + item.id + 'title').classList.add('justDone');
     
}


listFilenames(item){
//this.file.externalRootDirectory
//+ item.type + '/' + item.id 
var path = item.type + '/' + item.rtype + '/' + Math.floor(item.id/100).toString() + '/' + item.id //+ '/' + name;
      this.file.listDir(this.file.externalRootDirectory, 'Nibras/' +  path ).then((result) => {
         // result will have an array of file objects with 
         //file details or if its a directory
         var t = []         
         //document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'obj ' + result.entries.length//toString()
         for (let file of result) {
        
           if (file.isDirectory == true) {
           // t.push("-- " + file.name + '');
            // Code if its a folder
           } else if (file.isFile == true) {
             // Code if its a file
            //  console.log("This is a file"); (click)="openRFile(item.type, item.rtype, item.id, file)
             let name = file.name // File name
             t.push(name)// "<span (click)='openRFile(" + item.type + ', ' + item.rtype + ',' + item.id + ',' + name + ")'> " + 
                           name + item.type + item.id + '</span><br/> <b> bold </b>';
            // let path = file.path // File path
            //  file.getMetadata(function (metadata) {
              //  let size = metadata.size; // Get file size
               
            //  })
           }
         }
         //document.getElementById(item.type + '' + item.id + 'files1').innerHTML = t
         return t
      }).catch(
        (err) => {
        //console.log('error listing directory');
        // console.log(err);
        // document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'error ' + err.message
        return []
        }
        );
        
       
      
    

      // this.file.checkDir(this.file.externalRootDirectory, 'Nibras').then(_ =>
      //    document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'directory exists'
      //    ).catch(err =>
      //   document.getElementById(item.type + '' + item.id + 'files1').innerHTML = 'Directory doesnt exist ' + err
      //   );

      
      
}



openRFile(type, rtype, id, name){


  var path = 'Nibras/' + type + '/' + rtype + '/' + Math.floor(id/100).toString() + '/' + id + '/' + name;
  //document.getElementById(type + '' + id + 'files').innerHTML = ' path ' + path

  let ext = new Map([
    ["pdf","application/pdf"],
    ["mp3","audio/mpeg"],
    ["m3a","audio/mpeg"],
    ["mpga","audio/mpeg"],
    ["mp4","video/mp4"],
    ["mp4v","video/mp4"],
    ["mpg4","video/mp4"],
    ["txt","text/plain"],
    ["text","text/plain"],
    ["md","text/plain"],
    ["tex","text/plain"],
    ["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    ["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    ["ppt","application/vnd.ms-powerpoint"],
    ["doc","application/msword"],
    ["wma","audio/x-ms-wma"],
    ["mkv","mk3d"],
    ["mkv","mk3d"],
    ["avi","video/x-msvideo"],
    ["epub","application/epub+zip"],
    ["mobi","application/x-mobipocket-ebook"],
    ["html","text/html"],
    ["htm","text/html"],
    ["png","image/png"],
    ["jpeg","image/jpeg"],
    ["jpg","image/jpeg"],
    ["bmp","image/bmp"],
    ["csv","text/csv"],
    ["gif","image/gif"],
    ["ogg","audio/ogg"],
    ["opus","audio/opus"],
    ["3gp","video/3gpp"],
    ["m4a","audio/mp4"]
  ]);


   this.fileOpener.showOpenWithDialog(
     //'/storage/emulated/0/Nibras/' + path
     this.file.externalRootDirectory + path, ext.get(name.split('.')[1]))
   .then(() => document.getElementById(type+id + 'copy').innerHTML = name + ' opened')
    .catch(e =>document.getElementById(type+id + 'copy').innerHTML ='Error opening file ' + e.message + ' ' +
     this.file.externalRootDirectory + path + ' mine ' + ext.get(name.split('.')[1])) ;
   
  //this.storage.get('ipF').then((val) => { 
  //const browser = this.iab.create('https://' + val + '/' + path, '_system', 'location=yes');
  //});
}


openFile(type, id, name){


  var path = 'Nibras/' + type + '/' + id + '/' + name;
  //this.storage.get('ipF').then((val) => { 
 // const browser = this.iab.create('https://' + val + '/' + path, '_system', 'location=yes');
//  });

  
 // var path = 'Nibras/' + type + '/' + rtype + '/' + Math.floor(id/100).toString() + '/' + id + '/' + name;
  //document.getElementById(type + '' + id + 'files').innerHTML = ' path ' + path

  let ext = new Map([
    ["pdf","application/pdf"],
    ["mp3","audio/mpeg"],
    ["m3a","audio/mpeg"],
    ["mpga","audio/mpeg"],
    ["mp4","video/mp4"],
    ["mp4v","video/mp4"],
    ["mpg4","video/mp4"],
    ["txt","text/plain"],
    ["text","text/plain"],
    ["md","text/plain"],
    ["tex","text/plain"],
    ["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    ["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    ["ppt","application/vnd.ms-powerpoint"],
    ["doc","application/msword"],
    ["wma","audio/x-ms-wma"],
    ["mkv","mk3d"],
    ["mkv","mk3d"],
    ["avi","video/x-msvideo"],
    ["epub","application/epub+zip"],
    ["mobi","application/x-mobipocket-ebook"],
    ["html","text/html"],
    ["htm","text/html"],
    ["png","image/png"],
    ["jpeg","image/jpeg"],
    ["jpg","image/jpeg"],
    ["bmp","image/bmp"],
    ["csv","text/csv"],
    ["gif","image/gif"],
    ["ogg","audio/ogg"],
    ["opus","audio/opus"],
    ["3gp","video/3gpp"],
    ["m4a","audio/mp4"]
  ]);


   this.fileOpener.showOpenWithDialog(
     //'/storage/emulated/0/Nibras/' + path
     this.file.externalRootDirectory + path, ext.get(name.split('.')[1]))
   .then(() => document.getElementById(type+id + 'copy').innerHTML = name + ' opened')
    .catch(e =>document.getElementById(type+id + 'copy').innerHTML ='Error opening file ' + e.message + ' ' +
     this.file.externalRootDirectory + path + ' mine ' + ext.get(name.split('.')[1])) ;
}


  ngOnInit() {}

}
