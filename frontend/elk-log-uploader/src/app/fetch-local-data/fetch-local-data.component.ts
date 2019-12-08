import { Component, OnInit } from '@angular/core';
import { ApiService } from "./fetch-data.service";

@Component({
  selector: 'app-fetch-local-data',
  templateUrl: './fetch-local-data.component.html',
  styleUrls: ['./fetch-local-data.component.css']
})
export class FetchLocalDataComponent implements OnInit {
  fileData: any;

  public show: boolean = false;

  constructor(private apiService: ApiService) {
    this.fileData = [];
  }

  ngOnInit() {
    this.getAllFiles();
  }
  toggleDisk() {
    this.show = !this.show;
    this.getAllFiles();
  }
  getAllFiles() {
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.fileData = response;
    });
  }
}
