import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
	selector: 'app-connectivity-component',
	templateUrl: './connectivity-component.component.html',
	styleUrls: ['./connectivity-component.component.css']
})

export class ConnectivityComponentComponent implements OnInit, OnDestroy {


	public connectionError: boolean = false;
	protected checkDeviceConnectivitySubscription: Subscription;
	protected checkBrowserConnectivitySubscription: Subscription;

	constructor() {
	}

	ngOnInit() {
		//For mobile devices needed when app is not accessible from browser
		if (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) {
			this.checkDeviceConnectivitySubscription = Observable.interval(2000).subscribe(x => {
				this.checkDeviceConnection();
			});
		} else {
			this.checkBrowserConnectivitySubscription = Observable.interval(2000).subscribe(x => {
				this.checkBrowserConnection();
			});
		}
	}

	ngOnDestroy(): void {
		if (this.checkDeviceConnectivitySubscription) {
			this.checkDeviceConnectivitySubscription.unsubscribe();
			this.checkDeviceConnectivitySubscription = null;
		}
		if (this.checkBrowserConnectivitySubscription) {
			this.checkBrowserConnectivitySubscription.unsubscribe();
			this.checkBrowserConnectivitySubscription = null;
		}
	}

	checkBrowserConnection() {
		if (!navigator.onLine) {
			this.showDialog();
		} else {
			this.hideDialog();
		}
	}

	checkDeviceConnection() {
		if (navigator['connection']) {
			var connection = navigator['connection'];
			if (connection && connection.type == "none") {
				this.showDialog();
			} else {
				this.hideDialog();
			}
		}
	}

	showDialog() {
		this.connectionError = true;
	}

	hideDialog() {
		this.connectionError = false;
	}
}
