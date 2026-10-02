import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false,
})
export class DetailPage implements OnInit {

  constructor(private route:ActivatedRoute) { }

  id = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
