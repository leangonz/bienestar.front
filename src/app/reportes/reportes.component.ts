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

  exportarCompras() : void {
    const params = {"type": "1", "anio": "2018"};
    this.exportar(params);
  }

  exportarEvolucionPrecios() : void {
    const params = {"type": "2", "desde": "01/02/2018", "hasta": "01/08/2018"};
    this.exportar(params);
  }

  exportarHistorialDescarte() : void {
    const params = {"type": "3", "anio": "2018"};
    this.exportar(params);
  }

  exportar(params) : void {
    this.downloadService.getReportes(params)
      .subscribe(data => {
        var blob = new Blob([data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "asdasdasd";
        link.click(); 
      });
  }
}
