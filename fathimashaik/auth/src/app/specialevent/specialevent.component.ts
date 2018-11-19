import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
@Component({
  selector: 'app-specialevent',
  templateUrl: './specialevent.component.html',
  styleUrls: ['./specialevent.component.css']
})
export class SpecialeventComponent implements OnInit {
  specialEvents = []
  constructor(private _eventService: EventService, private _router: Router) { }

  ngOnInit() {
    this._eventService.getEvents()
      .subscribe(
        res => {
          this.specialEvents = res,
            err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this._router.navigate(['/login'])
                }
              }
            }
          console.log(this.specialEvents)
        },
        err => console.log(err)
      )
  }

}
