import { Component, OnInit } from '@angular/core';
import { Construction } from 'src/app/core/models/Construction';
import { ConstructionService } from 'src/app/core/services/construction.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.page.html',
  styleUrls: ['./loan.page.scss'],
})
export class LoanPage implements OnInit {
  loanMenu = [
    {
      title: 'Entrega',
      srcImg: 'assets/icon/entrega.svg',
      routePath: 'auth/loan-equipment/delivery',
    },
    {
      title: 'Devolución',
      srcImg: 'assets/icon/devolucionn.svg',
      routePath: 'auth/loan-equipment/return',
    },
    {
      title: 'Informe',
      srcImg: 'assets/icon/informe.svg',
      routePath: 'auth/loan-equipment/reports',
    },
  ];
  constructionSelected: Construction;
  constructor(private constructionService: ConstructionService) {}

  ngOnInit() {
    this.constructionSelected =
      this.constructionService.getConstructionSelected();
  }
}
