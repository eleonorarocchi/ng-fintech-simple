
import { ChangeDetectionStrategy, Component, ElementRef, Input, SimpleChange, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'er-map',
  template: `
    <div #host style="width: 100%; height: 300px"></div>
  `
})
export class MapComponent {
    @Input() locationCoords! : [number, number];
    @Input() locationName! : string;
    @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;

    map!: L.Map;
    marker!: L.Marker;

    ngOnChanges(changes: SimpleChange ) {
        const coords: L.LatLngExpression = this.locationCoords as L.LatLngExpression;
        if(typeof this.map !== "undefined")
        {
            this.map.setView(coords, 10);
            this.marker.setLatLng(coords).bindPopup(this.locationName)
        } else {
            this.map = L.map(this.host.nativeElement).setView(coords, 10);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
                this.map
            );
            this.marker = L.marker(coords)
            .addTo(this.map)
            .bindPopup(this.locationName)
            .openPopup();
        }
    }
}