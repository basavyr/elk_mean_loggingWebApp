import { Component, OnInit } from '@angular/core';
import { ApiService } from "./fetch-data.service";

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {

  fileData: any;

  public show: boolean = false;

  constructor(private apiService: ApiService) {
    this.fileData = [];
  }

  ngOnInit() {
     this.getAllFiles();
  }
  toggleMongo() {
    this.show = !this.show;
  }
  getAllFiles() {
    //Get saved list of students
    this.apiService.getMongoList().subscribe(response => {
      console.log(response);
      this.fileData = response;
    });
  }
}
