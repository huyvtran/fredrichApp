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

	public getNumWorkers(){// {{{
		return this.members.length;
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

}



