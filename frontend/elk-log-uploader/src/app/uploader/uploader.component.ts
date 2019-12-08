import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:8083/upload';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {
  title = '';
  uploader: FileUploader;
  fileName = '';

  constructor() {
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true,
      formatDataFunctionIsAsync: true,
      formatDataFunction: async item => {
        return new Promise((resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
  }

  ngOnInit() { }

  onSelectFile(): string {
    if (this.uploader.queue.length === 0) {
      return 'Choose file';
    } else {
      this.fileName = '';
      var uploader = this.uploader.queue;
      for (let i = 0; i < uploader.length; i++) {
        this.fileName = this.fileName.concat(uploader[i].file.name, ', ');
      }
      return this.fileName;
    }
  }
  
  onUpload(item): string {
    if (item.isSuccess) {
      return 'Upload Success';
    } else if (item.isError) {
      return 'Upload Failed';
    }
  }
}
