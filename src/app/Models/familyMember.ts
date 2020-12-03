export class FamilyMember {
    public id: string
    public name: string
    public assigned: boolean
    public picture: string
    constructor(id: string, name: string, assigned: boolean, picture: string){
        this.id = id
        this.name = name
        this.assigned = assigned
        this.picture = picture
    }
}