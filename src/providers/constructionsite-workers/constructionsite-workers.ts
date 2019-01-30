import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';

import { AuthServiceProvider } from '../auth-service/auth-service';
import { GlobalsProvider } from '../globals/globals'

import { WorkerTeam } from '../../classes/constructionsite/worker-team'

/*
  Generated class for the ConstructionsiteWorkersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstructionsiteWorkersProvider {

	workerTeam: WorkerTeam;

	loadingStatus:any;
	loadingStatusObserver:any;

  constructor(public http: HttpClient, private auth: AuthServiceProvider, public globals: GlobalsProvider) {
    console.log('Hello ConstructionsiteWorkersProvider Provider');
	  this.initialize();
  }

	// initialization and population
	initialize(){// {{{
		this.workerTeam = new WorkerTeam();
		this.loadingStatus = Observable.create(observer => {
			this.loadingStatusObserver = observer;
		});
	}// }}}
	loadWorkersData() {// {{{
		let url = this.globals.serverPhpScriptsUrl + "get_consite_workers.php?token=" + this.auth.getUserInfo().getToken();
		this.http.get(url)
			.subscribe(data => {
				let workers_raw = data["workers_arr"];
				for (let data_item of workers_raw){
					this.workerTeam.addMember(data_item);
				}
			},
			err => {this.loadingStatusObserver.next(false);},
			() => {
				this.loadingStatusObserver.next(true);
				this.loadingStatusObserver.complete();
			});
	}// }}}
	loadingUpdates(){// {{{
		return this.loadingStatus;
	}// }}}

	public getPolierCount(){// {{{
		return this.workerTeam.getPolierCount();
	}// }}}
	public getMaschinistCount(){// {{{
		return this.workerTeam.getMaschinistCount();
	}// }}}
	public getFacharbeiterCount(){// {{{
		return this.workerTeam.getFacharbeiterCount();
	}// }}}
	public getHilfsarbeiterCount(){// {{{
		return this.workerTeam.getHilfsarbeiterCount();
	}// }}}

	public getPresentPolierCount(){// {{{
		return this.workerTeam.getPresentPolierCount();
	}// }}}
	public getPresentMaschinistCount(){// {{{
		return this.workerTeam.getPresentMaschinistCount();
	}// }}}
	public getPresentFacharbeiterCount(){// {{{
		return this.workerTeam.getPresentFacharbeiterCount();
	}// }}}
	public getPresentHilfsarbeiterCount(){// {{{
		return this.workerTeam.getPresentHilfsarbeiterCount();
	}// }}}

	public getAllWorkersCount(){// {{{
		return this.workerTeam.getNumWorkers();
	}// }}}
	public getPresentWorkersCount(){// {{{
		return this.workerTeam.getPresentWorkersCount();
	}// }}}

	public getTeamMembers(){// {{{
		return this.workerTeam.getMembers();
	}// }}}
	public getTodaysWorkerHoursByRole(role: string):number{// {{{
		let hours=0;
		let workers = this.getTeamMembers();
		for (let worker of workers) {
			if(worker.getRole() === role){
				hours = hours + worker.getHoursWorkedToday();
			}
		}
		return hours;
	}// }}}

	public getPresentWorkerCountByRole(role: string){// {{{
		return this.workerTeam.getPresentWorkerCountByRole(role);
	}// }}}

	public getHourStartAvgByRole(role: string){// {{{
		return this.workerTeam.getHourStartAvgByRole(role);
	}// }}}
	public getHourEndAvgByRole(role: string){// {{{
		return this.workerTeam.getHourEndAvgByRole(role);
	}// }}}
	public getWorkerHoursByRoleToday(role: string){// {{{
		return this.workerTeam.getWorkerHoursByRoleToday(role);
	}// }}}



}
