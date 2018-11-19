import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loading: Loading;
	registerCredentials = { email: '', password: '' };

	constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

// 	public createAccount() {
// 		this.nav.push('RegisterPage');
// 	}

	public login() {
		this.showLoading();
		this.auth.login(this.registerCredentials)
			.subscribe(allowed => {
				if (allowed) {
					this.navCtrl.setRoot(HomePage);
				} else {
					this.showError("Access Denied");
				}
			},
			error => {
				this.showError(error);
		});
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Bitte warten...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

	showError(text) {
		this.loading.dismiss();

		let alert = this.alertCtrl.create({
			title: 'Fehler',
			subTitle: text,
			buttons: ['OK']
		});
// 		alert.present(prompt);
		alert.present();
	}

}
