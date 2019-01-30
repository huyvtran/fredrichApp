import { Worker } from './worker'

export class WorkerTeam {

	private members: any = [];

	//this is the team of workers working on the construction site
	constructor(){
		this.members = [];
	}

	setData(teamData: any) {
		this.setMembersFromArray(teamData);
	}
	//PUBLIC 
	public getWorker(id) : Worker {// {{{
		for (let worker of this.members){
			if(worker.id==id){return worker;}
			else {continue;}
		}
		console.log("WARNING: No worker with id: " + id + " found!");
		return null;
	}// }}}

	public isWorkerTeamMember(id) : boolean {// {{{
		for (let worker of this.members){
			if(worker.id==id){return true;}
			else {continue;}
		}
		return false;
	}// }}}

	public addMember(data){// {{{
		let worker = new Worker();
		worker.setData(data);
		this.members.push(worker);
	}// }}}
	public addMembersFromArray(teamData:any){// {{{
		for (let data of teamData) {
			this.addMember(data);
		}
	}// }}}
	public setMembersFromArray(teamData:any) {// {{{
		this.clearTeam();
		this.addMembersFromArray(teamData);
	}// }}}
	public getMembers(){// {{{
		return this.members;
	}// }}}

	public getPolierCount(){// {{{
		return this.getRoleCount("1Polier");
	}// }}}
	public getMaschinistCount(){// {{{
		return this.getRoleCount("2Maschinist");
	}// }}}
	public getFacharbeiterCount(){// {{{
		return this.getRoleCount("3Facharbeiter");
	}// }}}
	public getHilfsarbeiterCount(){// {{{
		return this.getRoleCount("4Hilfsarbeiter");
	}// }}}

	public getPresentPolierCount(){// {{{
		return this.getPresentWorkerCountByRole("1Polier");
	}// }}}
	public getPresentMaschinistCount(){// {{{
		return this.getPresentWorkerCountByRole("2Maschinist");
	}// }}}
	public getPresentFacharbeiterCount(){// {{{
		return this.getPresentWorkerCountByRole("3Facharbeiter");
	}// }}}
	public getPresentHilfsarbeiterCount(){// {{{
		return this.getPresentWorkerCountByRole("4Hilfsarbeiter");
	}// }}}

	public getPresentWorkerCountByRole(role){// {{{
		let count = 0;
		for (let member of this.members){
			if(member.role === role && member.isPresent){count++;}
		}
		return count;
	}// }}}
	public getWorkerHoursByRoleToday(role){// {{{
		let hours = 0;
		for(let worker of this.members){
			if(worker.getRole() == role && worker.isPresent){
				hours = hours + worker.getHoursWorkedToday();			
			}
		}
		return hours;
	}// }}}
	public getHourStartAvgByRole(role){// {{{
		let hour = 0;
		let numRoleCount = this.getPresentWorkerCountByRole(role);
		if(numRoleCount>0){
			for(let worker of this.members){
				if(worker.getRole() === role && worker.isPresent){
					hour = hour + this.timeStr2Num(worker.timeWorkStart);			
				}
			}
			hour = hour/numRoleCount;
		} else {
			hour=NaN;
		}
		return hour;
	}// }}}
	public getHourEndAvgByRole(role){// {{{
		let hour = 0;
		let numRoleCount = this.getPresentWorkerCountByRole(role);
		if(numRoleCount>0){
			for(let worker of this.members){
				if(worker.getRole() === role && worker.isPresent){
					hour = hour + this.timeStr2Num(worker.timeWorkEnd);			
				}
			}
			hour = hour/numRoleCount;
		} else {
			hour=NaN;
		}
		return hour;
	}// }}}
	public getNumWorkers(){// {{{
		return this.members.length;
	}// }}}
	public getPresentWorkersCount(){// {{{
		let count = 0;
		for (let member of this.members){
			if(member.isPresent){count++;}
		}
		return count;
	}// }}}

	//PRIVATE
	private clearTeam(){// {{{
		this.members = [];
	}// }}}

	private getRoleCount(role){// {{{
		let count = 0;
		for (let member of this.members){
			if(member.role === role){count++;}
		}
		return count;
	}// }}}

	private timeStr2Num(timeStr:string): number{
		let bits=timeStr.split(":");
		let timeNum = Number(bits[0]) + Number(bits[1])/60;
		return timeNum;
	}

}



