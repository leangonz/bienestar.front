import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../services/download/download.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(private downloadService: DownloadService) { }

  ngOnInit() {
  }

  exportar() : void {
    this.downloadService.getReportes()
      .subscribe(data => {
        var blob = new Blob([data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "asdasdasd";
        link.click(); 
      });
  }
}
